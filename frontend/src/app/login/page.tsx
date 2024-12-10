'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { login } from '../../utils/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const router = useRouter();

  // Custom validation functions
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password: string): boolean => {
    return password.length >= 8;
  };

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!isValidEmail(email)) {
      newErrors.email = 'Invalid email format.';
    }

    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (!isValidPassword(password)) {
      newErrors.password = 'Password must be at least 8 characters long.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await login({ email, password });
      localStorage.setItem('token', response.token);
      router.push('/');
    } catch (error) {
      setErrors({ password: 'Invalid credentials' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-6">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-3 py-2 border ${
                errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              } rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300 focus:outline-none focus:ring focus:ring-primary focus:border-primary`}
              placeholder="Email"
              required
            />
            {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-3 py-2 border ${
                errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              } rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300 focus:outline-none focus:ring focus:ring-primary focus:border-primary`}
              placeholder="Password"
              required
            />
            {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-300 focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-50"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-gray-700 dark:text-gray-300">
          Don't have an account? <Link href="/register" className="text-primary hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}