'use client';

import React, { useEffect, useState } from 'react';
import { Space, fetchSpaces, deleteSpace } from '../utils/api';
import { useRouter } from 'next/navigation';

interface SpaceListProps {
  refresh: boolean;
}

const SpaceList: React.FC<SpaceListProps> = ({ refresh }) => {
  const [spaces, setSpaces] = useState<Space[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchSpaces()
      .then(setSpaces)
      .catch(error => console.error(error));
  }, [refresh]);

  const handleDelete = async (id: string) => {
    try {
      await deleteSpace(id);
      setSpaces(spaces.filter(space => space.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Spaces</h1>
      <ul className="space-y-6">
        {spaces.map(space => (
          <li key={space.id} className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-2xl font-semibold text-gray-800 dark:text-gray-200">{space.name}</div>
                <div className="text-gray-600 dark:text-gray-400">Type: {space.type}</div>
                <div className="text-gray-600 dark:text-gray-400">Capacity: {space.capacity}</div>
                <div className="text-gray-600 dark:text-gray-400">Occupied: {space.occupied}</div>
                <div className="text-gray-600 dark:text-gray-400">Price per unit: ${space.price_per_unit}</div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => router.push(`/spaces/edit/${space.id}`)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(space.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SpaceList;