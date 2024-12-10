// src/pages/spaces/index.tsx

'use client';

import React, { useState } from 'react';
import SpaceList from '../../components/SpaceList';
import { useRouter } from 'next/navigation';
import { FaFilter, FaSearch } from 'react-icons/fa';

const SpacesPage: React.FC = () => {
  const [refresh, setRefresh] = useState(false);
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const router = useRouter();

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Spaces</h1>
          <button
            onClick={() => router.push('/spaces/new')}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 transition-colors duration-300"
          >
            Add Space
          </button>
        </div>

        {/* Filter and Search Controls */}
        <div className="flex flex-col md:flex-row items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
          {/* Filter Dropdown */}
          <div className="flex items-center w-full md:w-1/4">
            <FaFilter className="text-gray-600 dark:text-gray-300 mr-2" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="flex-1 p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              <option value="hanger">Hanger</option>
              <option value="shelf">Shelf</option>
            </select>
          </div>

          {/* Search Input */}
          <div className="flex items-center w-full md:w-1/4">
            <FaSearch className="text-gray-600 dark:text-gray-300 mr-2" />
            <input
              type="text"
              placeholder="Search Spaces"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Space List */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
          <SpaceList
            refresh={refresh}
            onDelete={handleRefresh}
            filterType={filterType}
            searchQuery={searchQuery}
          />
        </div>
      </div>
    </div>
  );
};

export default SpacesPage;