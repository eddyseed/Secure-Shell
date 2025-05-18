'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
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
        <Link href="/login" className="text-blue-500 hover:underline mr-4">Login</Link>
        <Link href="/signup" className="text-blue-500 hover:underline mr-4">Signup</Link>
      </div>
      )}
    </div>
  );
};

export default Home;