import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center  dark:bg-gray-900 text-gray-800 dark:text-white p-6">
      <div className="max-w-md text-center">
        <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <Button onClick={() => navigate('/')} className="px-6 py-2">
          Go Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
