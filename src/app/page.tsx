'use client'
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"
import { useAuth } from '@/context/AuthContext';
import { supabaseClient } from "@/config/dbConfig";
const Home: React.FC = () => {
  const { isLoggedIn, loading } = useAuth();
  const [clientSide, setClientSide] = useState(false);
  const handleLogOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await supabaseClient.auth.signOut();
  }
  useEffect(() => {
    setClientSide(true);
  }, []);
  if (!clientSide || loading) return <p>Loading...</p>;
  return (
    <div className="flex items-center justify-center h-screen">
      {isLoggedIn ? (
      <Button variant="destructive" onClick={(e) => { handleLogOut(e) }}>
        Logout
      </Button>
      ) : (
      <div className="text-center">
        <h1>Please log in</h1>
        <div className="mt-4">
        <a href="/login" className="text-blue-500 hover:underline mr-4">Login</a>
        <a href="/signup" className="text-blue-500 hover:underline">Sign Up</a>
        </div>
      </div>
      )}
    </div>
  );
};

export default Home;