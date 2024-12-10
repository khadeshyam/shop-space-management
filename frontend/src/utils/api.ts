import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Axios instance with interceptor to add Authorization header
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Add a request interceptor to include the token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export interface Space {
  id?: string;
  name: string;
  type: 'hanger' | 'shelf';
  capacity: number;
  occupied?: number;
  price_per_unit: number;
}

export interface User {
  username?: string;
  email: string;
  password: string;
}

// Authentication Functions

export async function register(user: User): Promise<{ token: string }> {
  const response = await axiosInstance.post('/register', user);
  localStorage.setItem('token', response.data.token);
  return response.data;
}

export async function login(user: User): Promise<{ token: string }> {
  const response = await axiosInstance.post('/login', {
    email: user.email,
    password: user.password,
  });
  localStorage.setItem('token', response.data.token);
  localStorage.setItem('user_id', response.data.user_id);
  return response.data;
}

export async function logout(): Promise<void> {
  await axiosInstance.post('/logout');
  localStorage.removeItem('token');
  localStorage.removeItem('user_id');
}

// Space CRUD Functions

export async function fetchSpaces(): Promise<Space[]> {
  const response = await axiosInstance.get('/spaces');
  return response.data;
}

export async function fetchSpace(id: string): Promise<Space> {
  const response = await axiosInstance.get(`/spaces/${id}`);
  return response.data;
}

export async function createSpace(space: Space): Promise<Space> {
  const response = await axiosInstance.post('/spaces', space);
  return response.data;
}

export async function updateSpace(id: string, space: Space): Promise<Space> {
  const response = await axiosInstance.put(`/spaces/${id}`, space);
  return response.data;
}

export async function deleteSpace(id: string): Promise<void> {
  await axiosInstance.delete(`/spaces/${id}`);
}

// Fetch all spaces for a specific user by ID
export async function fetchSpacesByUser(userId: number): Promise<Space[]> {
  const response = await axiosInstance.get(`/users/${userId}/spaces`);
  return response.data;
}