'use client';

import React, { useState } from 'react';
import SpaceList from '../../components/SpaceList';
import { useRouter } from 'next/navigation';

const SpacesPage: React.FC = () => {
  const [refresh, setRefresh] = useState(false);
  const router = useRouter();

  const handleSave = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Spaces</h1>
          <button
            onClick={() => router.push('/spaces/new')}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 transition-colors duration-300"
          >
            Add Space
          </button>
        </div>
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
          <SpaceList refresh={refresh} onDelete={handleSave} />
        </div>
      </div>
    </div>
  );
};

export default SpacesPage;