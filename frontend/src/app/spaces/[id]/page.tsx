'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import SpaceDetail from '../../../components/SpaceDetail';

const SpaceDetailPage: React.FC = () => {
  const { id } = useParams();

  if (!id) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <SpaceDetail spaceId={id as string} />
      </div>
    </div>
  );
};

export default SpaceDetailPage;