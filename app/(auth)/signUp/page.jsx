'use client';
import React, { useState } from 'react';
import { CldUploadButton } from 'next-cloudinary';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [companyCode, setCompanyCode] = useState('');
    const [employType, setEmployType] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [imgPreview, setImgPreview] = useState('');
    const router = useRouter()

    const handleUploadSuccess = (result) => {
        const url = result.info.secure_url;
        setImgUrl(url);
        setImgPreview(url);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if companyCode is exactly 4 characters
        if (companyCode.length !== 4) {
            toast.error('Company Code must be exactly 4 characters long');
            return;
        }

        const userData = {
            name,
            email,
            password,
            companyName,
            companyCode: Number(companyCode),
            employType,
            imgUrl,
        };
        

        const res  = await axios.post('/api/auth/createUser', userData);
        if(res.status === 200) {
            toast.success('User created successfully');
            router.push('/signIn')
        }
    };

    return (
        <div className="min-h-screen bg-[#07090F] flex items-center justify-center">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg">
                <h2 className="text-3xl font-bold text-white text-center mb-8">Sign Up</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full p-3 rounded-md bg-gray-900 text-white focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your name"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full p-3 rounded-md bg-gray-900 text-white focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full p-3 rounded-md bg-gray-900 text-white focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300">Company Name</label>
                        <input
                            type="text"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            className="mt-1 block w-full p-3 rounded-md bg-gray-900 text-white focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter company name"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300">Company Code (4 Number)</label>
                        <input
                            type="number"
                            value={companyCode}
                            onChange={(e) => setCompanyCode(e.target.value)}
                            className="mt-1 block w-full p-3 rounded-md bg-gray-900 text-white focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter company code"
                            maxLength={4}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300">Employment Type</label>
                        <select
                            value={employType}
                            onChange={(e) => setEmployType(e.target.value)}
                            className="mt-1 block w-full p-3 rounded-md bg-gray-900 text-white focus:ring-blue-500 focus:border-blue-500"
                            required
                        >
                            <option value="">Select an option</option>
                            <option value="HR">HR</option>
                            <option value="IT">IT</option>
                            <option value="Sales">Sales</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Finance">Finance</option>
                            <option value="Operations">Operations</option>
                            <option value="Customer Support">Customer Support</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300">Profile Picture</label>
                        {imgPreview ? (
                            <div className="mt-4">
                                <img src={imgPreview} alt="Uploaded Preview" className="w-40 flex items-center justify-center rounded-md" />
                            </div>
                        ) : (
                            <CldUploadButton
                                uploadPreset="naezride"
                                onSuccess={handleUploadSuccess}
                                className="mt-1 block w-full text-white focus:ring-blue-500 focus:border-blue-500"
                            >
                                Upload Image
                            </CldUploadButton>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
