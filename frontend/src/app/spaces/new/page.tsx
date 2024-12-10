'use client';

import React from 'react';
import SpaceForm from '../../../components/SpaceForm';
import { useRouter } from 'next/navigation';

const NewSpacePage: React.FC = () => {
  const router = useRouter();

  const handleSave = () => {
    router.push('/spaces');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100 text-center">Add New Space</h1>
        <SpaceForm onSave={handleSave} />
      </div>
    </div>
  );
};

export default NewSpacePage;