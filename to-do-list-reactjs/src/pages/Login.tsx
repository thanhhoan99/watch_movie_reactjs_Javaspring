/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuthStore } from '../stores/useAuthStore';
import { useState } from 'react';

interface IFormInput {
  username: string;
  password: string;
}

const validationSchema: yup.ObjectSchema<IFormInput> = yup.object({
  username: yup
    .string()
    .required('Username is required')
    .min(5, 'Username must be at least 5 characters')
    .max(100, 'Username must be less than 100 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(50, 'Password must be less than 50 characters'),
});

export default function Login() {
  const { login } = useAuthStore((state) => state);
  const [loginError, setLoginError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, dirtyFields },
  } = useForm<IFormInput>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
    defaultValues: {
      username: 'Administrators',
      password: '123456',
    },
  });

  const onSubmit = async (data: IFormInput): Promise<void> => {
    try {
      setLoginError(null); // Clear previous errors
      await login({ username: data.username, password: data.password });

      const { error } = useAuthStore.getState();
      if (!error) {
        window.location.href = '/home';
      } else {
        setLoginError(error?.response?.data?.message || 'Login failed.');
      }
    } catch (err: any) {
      console.error('Login failed:', err);
      setLoginError(err?.response?.data?.message || 'Something went wrong.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Login with Zustand</h2>

        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            id="username"
            type="text"
            {...register('username')}
            className={`w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
              errors.username
                ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                : dirtyFields.username
                ? 'border-green-500 focus:border-green-500 focus:ring-green-200'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
            }`}
            placeholder="Enter your username"
          />
          {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register('password')}
            className={`w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
              errors.password
                ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                : dirtyFields.password
                ? 'border-green-500 focus:border-green-500 focus:ring-green-200'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
            }`}
            placeholder="Enter your password"
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !isValid}
          className={`w-full py-2 rounded-md font-medium transition-colors ${
            isSubmitting || !isValid ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-900 hover:bg-gray-600 text-white'
          }`}
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>

        <div className="mt-4 text-center">
          <p className={`text-xs ${isValid ? 'text-green-500' : 'text-red-500'}`}>
            {isValid ? 'Form is valid ✓' : 'Please fill in all required fields correctly'}
          </p>
          {loginError && <p className="text-red-500 text-xs mt-1">{loginError}</p>}
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account? <a href="/register" className="text-blue-600 hover:underline">Register</a>
          </p>
        </div>
      </form>
    </div>
  );
}
