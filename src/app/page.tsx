'use client'
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"
import { useAuth } from '@/context/AuthContext';
const Home: React.FC = () => {
  const { isLoggedIn, loading } = useAuth();
  const [clientSide, setClientSide] = useState(false);
  const handleLogOut = async (e:any) => {
    e.preventDefault();
    // To implement logout feature
  }
  useEffect(() => {
    setClientSide(true);
  }, []);
  if (!clientSide || loading) return <p>Loading...</p>;
  return (
    <div className="flex items-center justify-center h-screen" onClick={(e) => {handleLogOut(e)}}>
      {isLoggedIn ? <Button variant="destructive">Logout</Button> : (
        <div>
          <h1>Please log in</h1>
        </div>
      )}
    </div>
  );
};

export default Home;