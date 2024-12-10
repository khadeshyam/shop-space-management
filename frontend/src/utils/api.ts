import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/spaces';

export interface Space {
  id?: string;
  name: string;
  type: 'hanger' | 'shelf';
  capacity: number;
  occupied?: number;
  price_per_unit: number;
}

export async function fetchSpaces(): Promise<Space[]> {
  const response = await axios.get(API_BASE_URL);
  return response.data;
}

export async function fetchSpace(id: string): Promise<Space> {
  const response = await axios.get(`${API_BASE_URL}/${id}`);
  return response.data;
}

export async function createSpace(space: Space): Promise<Space> {
  const response = await axios.post(API_BASE_URL, space);
  return response.data;
}

export async function updateSpace(id: string, space: Space): Promise<Space> {
  const response = await axios.put(`${API_BASE_URL}/${id}`, space);
  return response.data;
}

export async function deleteSpace(id: string): Promise<void> {
  await axios.delete(`${API_BASE_URL}/${id}`);
}