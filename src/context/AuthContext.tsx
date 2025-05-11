'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabaseClient } from "@/config/dbConfig";
interface AuthContextProps {
  session: any;
  user: any;
  loading: boolean;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextProps>({
  session: null,
  user: null,
  loading: true,
  isLoggedIn: false,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Initialize session on mount
    supabaseClient.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setIsLoggedIn(!!data.session?.user);
      setLoading(false);
    });

    // Listen for session changes (login, logout)
    const { data: listener } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoggedIn(!!session?.user);
    });

    // Cleanup listener on unmount
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ session, user, loading, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)