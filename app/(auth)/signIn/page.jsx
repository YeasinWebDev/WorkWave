'use client';
import Loader from '@/components/Loader';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    
    if (status === 'authenticated') {
      router.push('/');
    }
  }, [status, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      toast.error('Please enter your email and password.');
      return;
    }

    setLoading(true);

    const res = await signIn('credentials', {
      redirect: false,
      email: email,
      password: password,
    });

    setLoading(false); // Reset loading state

    if (res?.ok) {
      toast.success('Sign In Successfully');
      router.push('/');
      window.location.reload()
    } else {
      toast.error(res?.error || 'Sign In failed. Please check your credentials.');
    }
  };

  console.log(session)
  // Return loading state initially
  if (status === 'loading') {
    return <Loader/>
  }

  if(session.user){
    return router.push('/')
  }

  return (
    <div className="min-h-screen bg-[#07090F] flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-white text-center mb-8">Sign In</h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              className="mt-1 block w-full p-3 rounded-md bg-gray-900 text-white focus:px-6 focus:py-4 outline-none duration-300 transition-all"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              disabled={loading} // Disable input while loading
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              className="mt-1 block w-full p-3 rounded-md bg-gray-900 text-white focus:px-6 focus:py-4 outline-none duration-300 transition-all"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              disabled={loading} // Disable input while loading
            />
          </div>

          <button
            type="submit"
            className={`w-full py-3 ${loading ? 'bg-gray-600' : 'bg-blue-600 hover:bg-blue-700'} hover:scale-95 duration-300 transition-all text-white font-bold rounded-md`}
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
          
          <p className="text-white flex items-center justify-center">
            Don't have an account?
            <Link className="mx-2 font-semibold cursor-pointer" href={'/signUp'}>
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
