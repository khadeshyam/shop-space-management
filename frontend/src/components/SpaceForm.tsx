'use client';
import React, { useState, useEffect } from 'react';
import { createSpace, updateSpace, fetchSpace, Space } from '../utils/api';

interface SpaceFormProps {
  id?: string;
  onSave: () => void;
}

const SpaceForm: React.FC<SpaceFormProps> = ({ id, onSave }) => {
  const [formData, setFormData] = useState<Space>({ name: '', type: 'hanger', capacity: 0, price_per_unit: 0 });

  useEffect(() => {
    if (id) {
      fetchSpace(id).then(setFormData).catch(error => console.error(error));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        await updateSpace(id, formData);
      } else {
        await createSpace(formData);
      }
      onSave();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 dark:bg-gray-900 p-8 rounded-lg shadow-lg max-w-lg mx-auto">
      <div>
        <label className="block mb-2 text-gray-700 dark:text-gray-300 font-bold">Name</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
          placeholder="Name"
          required
        />
      </div>
      <div>
        <label className="block mb-2 text-gray-700 dark:text-gray-300 font-bold">Type</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
        >
          <option value="hanger">Hanger</option>
          <option value="shelf">Shelf</option>
        </select>
      </div>
      <div>
        <label className="block mb-2 text-gray-700 dark:text-gray-300 font-bold">Capacity</label>
        <input
          name="capacity"
          type="number"
          value={formData.capacity}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
          placeholder="Capacity"
          required
        />
      </div>
      <div>
        <label className="block mb-2 text-gray-700 dark:text-gray-300 font-bold">Price per unit</label>
        <input
          name="price_per_unit"
          type="number"
          value={formData.price_per_unit}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
          placeholder="Price per unit"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
      >
        Save
      </button>
    </form>
  );
};

export default SpaceForm;