import React, { useEffect, useState } from 'react';
import { Space, fetchSpace } from '../utils/api';
import { useRouter } from 'next/navigation';

interface SpaceDetailProps {
  spaceId: string;
}

const SpaceDetail: React.FC<SpaceDetailProps> = ({ spaceId }) => {
  const [space, setSpace] = useState<Space | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchSpace(spaceId).then(setSpace).catch(error => console.error(error));
  }, [spaceId]);

  if (!space) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">{space.name}</h1>
      <div className="text-lg text-gray-600 dark:text-gray-400 mb-2">Type: {space.type}</div>
      <div className="text-lg text-gray-600 dark:text-gray-400 mb-2">Capacity: {space.capacity}</div>
      <div className="text-lg text-gray-600 dark:text-gray-400 mb-2">Occupied: {space.occupied}</div>
      <div className="text-lg text-gray-600 dark:text-gray-400 mb-4">Price per unit: ${space.price_per_unit}</div>
      <button
        onClick={() => router.push(`/spaces/edit/${space.id}`)}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
      >
        Edit
      </button>
    </div>
  );
};

export default SpaceDetail;