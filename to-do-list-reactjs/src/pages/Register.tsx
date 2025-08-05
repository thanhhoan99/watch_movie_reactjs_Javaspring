/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import apiClient from '../libraries/api-client-advanced';

interface IRegisterInput {
  username: string;
  password: string;
  confirmPassword: string;
}

const validationSchema: yup.ObjectSchema<IRegisterInput> = yup.object({
  username: yup
    .string()
    .required('Username is required')
    .min(5, 'Must be at least 5 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Must be at least 6 characters'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Please confirm your password'),
});

export default function Register() {
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IRegisterInput>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: IRegisterInput) => {
    try {
      setRegisterError(null);
      setSuccess(false);

      await apiClient.post('/auth/register', {
        username: data.username,
        password: data.password,
        confirmPassword: data.confirmPassword,
        // ❌ Không cần gửi roleNames, backend tự gán
      });

      setSuccess(true);
      setTimeout(() => {
        window.location.href = '/login'; // Redirect to login after successful registration
      }, 2000);
    } catch (error: any) {
      console.error('Register error:', error);
      const message =
        error.response?.data?.message || 'Registration failed. Please try again.';
      setRegisterError(message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>

        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            id="username"
            type="text"
            {...register('username')}
            className="w-full mt-2 p-2 border rounded-md"
            placeholder="Enter username"
          />
          {errors.username && (
            <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register('password')}
            className="w-full mt-2 p-2 border rounded-md"
            placeholder="Enter password"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            {...register('confirmPassword')}
            className="w-full mt-2 p-2 border rounded-md"
            placeholder="Confirm password"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          {isSubmitting ? 'Registering...' : 'Register'}
        </button>

        {registerError && (
          <p className="text-red-500 text-xs mt-4 text-center">{registerError}</p>
        )}
        {success && (
          <p className="text-green-600 text-xs mt-4 text-center">Registration successful!</p>
        )}
      </form>
    </div>
  );
}
