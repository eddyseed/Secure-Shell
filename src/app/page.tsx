import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
      Logout
      </button>
    </div>
  );
};

export default Home;