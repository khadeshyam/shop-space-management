'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import SpaceForm from '../../../../components/SpaceForm';

const EditSpacePage: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();
  console.log('id:', id);

  const handleSave = () => {
    router.push('/spaces');
  };

  if (!id) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100 text-center">Edit Space</h1>
        <SpaceForm id={id as string} onSave={handleSave} />
      </div>
    </div>
  );
};

export default EditSpacePage;