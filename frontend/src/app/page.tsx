'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { logout } from '../utils/api';

export default function Home() {
  const [refresh, setRefresh] = useState(false);
  const router = useRouter();

  const handleSave = () => {
    setRefresh(!refresh);
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white flex flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 py-8 px-6 shadow sm:rounded-lg sm:px-10">
          <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-6">Manage Spaces</h2>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
            <button
              onClick={() => router.push('/spaces/new')}
              className="w-full sm:w-auto px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-700 transition-colors duration-300"
            >
              Add Space
            </button>
            <button
              onClick={() => router.push('/spaces')}
              className="w-full sm:w-auto px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              View Spaces
            </button>
            <button
              onClick={handleLogout}
              className="w-full sm:w-auto px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}