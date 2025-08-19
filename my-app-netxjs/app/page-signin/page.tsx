/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
"use client"
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuthStore } from '../../stores/useAuthStore';
import Layout from "@/components/Layout/Layout";
import Link from "next/link";
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

export default function Signin() {
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
          window.location.href = '/';
        } else {
          setLoginError(error?.response?.data?.message || 'Login failed.');
        }
      } catch (err: any) {
        console.error('Login failed:', err);
        setLoginError(err?.response?.data?.message || 'Something went wrong.');
      }
    };
  return (
    <>
      <Layout>
        <section className="pt-100 login-register">
          <div className="container">
            <div className="row login-register-cover">
              <div className="col-lg-4 col-md-6 col-sm-12 mx-auto">
                <div className="text-center">
                  <p className="font-sm text-brand-2">Welcome back! </p>
                  <h2 className="mt-10 mb-5 text-brand-1">Member Login</h2>
                  <p className="font-sm text-muted mb-30">Access to all features. No credit card required.</p>
                  <button className="btn social-login hover-up mb-20">
                    <img src="assets/imgs/template/icons/icon-google.svg" alt="jobbox" />
                    <strong>Sign in with Google</strong>
                  </button>
                  <div className="divider-text-center">
                    <span>Or continue with</span>
                  </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="login-register text-start mt-20" action="#">
                  <div className="form-group">
                    <label className="form-label" htmlFor="input-1">
                      Username or Email address *
                    </label>
                    <input className={`form-control ${
                        errors.username
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                          : dirtyFields.username
                          ? 'border-green-500 focus:border-green-500 focus:ring-green-200'
                          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                      }`}
                    id="username"
                    type="text"
                    {...register('username')} required name="username" placeholder="Steven Job" 
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="input-4">
                      Password *
                    </label>
                    <input    id="password"
            type="password"
            {...register('password')}
            className={`form-control ${
              errors.password
                ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                : dirtyFields.password
                ? 'border-green-500 focus:border-green-500 focus:ring-green-200'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
            }`} required name="password" placeholder="************" />
                  </div>
                  <div className="login_footer form-group d-flex justify-content-between">
                    <label className="cb-container">
                      <input type="checkbox" />
                      <span className="text-small">Remenber me</span>
                      <span className="checkmark" />
                    </label>
                    <Link href="/page-contact">
                      <span className="text-muted">Forgot Password</span>
                    </Link>
                  </div>
                  <div className="form-group">
                    {/* <button className="btn btn-brand-1 hover-up w-100" type="submit" name="login">
                      Login
                    </button> */}
                     <button
                     name="login"
                      type="submit"
                      disabled={isSubmitting || !isValid}
                      className={`btn btn-brand-1 hover-up w-100${
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
                  </div>
                  <div className="text-muted text-center">
                    Don't have an Account?
                    <Link href="/page-signin">
                      <span>Sign up</span>
                    </Link>
                  </div>
                </form>
              </div>
              <div className="img-1 d-none d-lg-block">
                <img className="shape-1" src="assets/imgs/page/login-register/img-4.svg" alt="JobBox" />
              </div>
              <div className="img-2">
                <img src="assets/imgs/page/login-register/img-3.svg" alt="JobBox" />
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
