'use client';

import React, { useEffect, useState } from 'react';
import { Space, fetchSpacesByUser, deleteSpace } from '../utils/api';
import { useRouter } from 'next/navigation';

interface SpaceListProps {
  refresh: boolean;
  filterType: string;
  searchQuery: string;
  onDelete: () => void;
}

const SpaceList: React.FC<SpaceListProps> = ({ refresh, filterType, searchQuery, onDelete }) => {
  const [spaces, setSpaces] = useState<Space[]>([]);
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      console.error('User ID not found in localStorage.');
      return;
    }

    fetchSpacesByUser(userId)
      .then((data) => {
        let filtered = data;
        if (filterType !== 'all') {
          filtered = filtered.filter((space) => space.type === filterType);
        }
        if (searchQuery) {
          filtered = filtered.filter((space) =>
            space.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        setSpaces(filtered);
      })
      .catch((error) => console.error(error));
  }, [refresh, filterType, searchQuery]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this space?')) return;

    try {
      await deleteSpace(id);
      onDelete();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {spaces.length === 0 ? (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md text-center text-gray-700 dark:text-gray-300">
          No spaces found.
        </div>
      ) : (
        <ul className="space-y-6">
          {spaces.map((space) => (
            <li
              key={space.id}
              className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                    {space.name}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">Type: {space.type}</div>
                  <div className="text-gray-600 dark:text-gray-400">Capacity: {space.capacity}</div>
                  <div className="text-gray-600 dark:text-gray-400">Occupied: {space.occupied}</div>
                  <div className="text-gray-600 dark:text-gray-400">
                    Price per unit: ${space.price_per_unit}
                  </div>
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
      )}
    </div>
  );
};

export default SpaceList;