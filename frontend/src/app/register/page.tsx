'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { register } from '../../utils/api';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ username?: string; email?: string; password?: string }>({});
  const router = useRouter();

  // Custom validation functions
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidUsername = (username: string): boolean => {
    return username.trim().length >= 3;
  };

  const isValidPassword = (password: string): boolean => {
    return password.length >= 8;
  };

  const validate = () => {
    const newErrors: { username?: string; email?: string; password?: string } = {};

    // Validate Username
    if (!username.trim()) {
      newErrors.username = 'Username is required.';
    } else if (!isValidUsername(username)) {
      newErrors.username = 'Username must be at least 3 characters long.';
    }

    // Validate Email
    if (!email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!isValidEmail(email)) {
      newErrors.email = 'Invalid email format.';
    }

    // Validate Password
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
      await register({ username, email, password });
      router.push('/login');
    } catch (error: any) {
      // Handle specific error messages based on server response if available
      if (error.response && error.response.data && error.response.data.error) {
        setErrors({ password: error.response.data.error });
      } else {
        setErrors({ password: 'Registration failed. Please try again.' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-6">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Field */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full px-3 py-2 border ${
                errors.username ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              } rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300 focus:outline-none focus:ring focus:ring-primary focus:border-primary`}
              placeholder="Username"
              required
            />
            {errors.username && <div className="text-red-500 text-sm mt-1">{errors.username}</div>}
          </div>

          {/* Email Field */}
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

          {/* Password Field */}
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

          {/* Server-side Error */}
          {errors.password && <div className="text-red-500">{errors.password}</div>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-300 focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-50"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-gray-700 dark:text-gray-300">
          Already have an account? <Link href="/login" className="text-primary hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}