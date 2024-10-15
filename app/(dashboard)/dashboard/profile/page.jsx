'use client'
import DashHero from '@/components/dashboard/DashHero'
import { useSession } from 'next-auth/react'
import { MdOutlineEdit } from "react-icons/md";
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import Loader from '@/components/Loader';

const Page = () => {
    const { data: session,status } = useSession()
    const user = session?.user
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        companyName: '',
        employType: '',
        location: '',
        contact: '',
        salary: '',
    });

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        if(user){
            setFormData({
                name: user.name || '',
                email: user.email || '',
                companyName: user.companyName || '',
                employType: user.employType || '',
                location: user.location || '',
                contact: user.contact || '',
                salary: user.salary || '',
            });
        }
    }, [user])

    // Handle form submit (to be integrated with API)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); 
        try {
            const profileresult = await axios.post('/api/updateProfile', formData);
            setLoading(false);
            if (profileresult.status === 200) {
                toast.success("Profile updated successfully");
                window.location.reload();
            } else {
                toast.error("Failed to update profile");
            }
        } catch (error) {
            setLoading(false);
            toast.error("Failed to update profile");
        }
    };

    if(status ==='loading'){
        return <Loader/>
    }

    return (
        <div>
            <DashHero text={'Profile'} />
            <div className='flex flex-col justify-center items-center'>
                <div className='relative'>
                    <img className='w-40 h-40 object-cover rounded-full' src={user?.imgUrl} alt="" />
                    {/* icons */}
                    <label htmlFor="my_modal_7">
                        <div className='absolute -right-32 top-2 border-[1px] border-[#181920] p-3 rounded-md cursor-pointer'>
                            <MdOutlineEdit color='#f2f2f2' />
                        </div>
                    </label>
                </div>
                <div className="max-w-md p-6 text-white rounded-md shadow-lg shadow-[#0C1A25]">
                    <div className="grid gap-4 grid-cols-2 ">
                        {/* Display user details */}
                        <div>
                            <h2 className="text-lg font-medium">Name:</h2>
                            <p className="text-gray-400">{user?.name || "N/A"}</p>
                        </div>
                        <div>
                            <h2 className="text-lg font-medium">Email:</h2>
                            <p className="text-gray-400">{user?.email || "N/A"}</p>
                        </div>
                        <div>
                            <h2 className="text-lg font-medium">Company Name:</h2>
                            <p className="text-gray-400">{user?.companyName || "N/A"}</p>
                        </div>
                        <div>
                            <h2 className="text-lg font-medium">Company Code:</h2>
                            <p className="bg-[#0C1A25] p-2 text-gray-400 rounded-xl w-fit">{user?.companyCode || "N/A"}</p>
                        </div>
                        <div>
                            <h2 className="text-lg font-medium">Department:</h2>
                            <p className="text-gray-400">{user?.employType || "N/A"}</p>
                        </div>
                        <div>
                            <h2 className="text-lg font-medium">Location:</h2>
                            <p className="text-gray-400">{user?.location || "N/A"}</p>
                        </div>
                        <div>
                            <h2 className="text-lg font-medium">Contact:</h2>
                            <p className="text-gray-400">{user?.contact || "N/A"}</p>
                        </div>
                        <div>
                            <h2 className="text-lg font-medium">Salary:</h2>
                            <p className="font-semibold text-red-500">{user?.salary ? `${user?.salary} Tk` : "N/A"}</p>
                        </div>
                    </div>
                </div>

                {/* Modal for updating profile data */}
                <input type="checkbox" id="my_modal_7" className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box w-11/12 max-w-3xl bg-[#07090F]">
                        <h3 className="text-lg font-bold mb-4">Update Profile</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col">
                                    <label className="font-medium">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="input input-bordered bg-[#0C1A25]"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="font-medium">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="input input-bordered bg-[#0C1A25]"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="font-medium">Company Name</label>
                                    <input
                                        type="text"
                                        name="companyName"
                                        value={formData.companyName}
                                        onChange={handleInputChange}
                                        className="input input-bordered bg-[#0C1A25]"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="font-medium">Department</label>
                                    <input
                                        type="text"
                                        name="employType"
                                        value={formData.employType}
                                        onChange={handleInputChange}
                                        className="input input-bordered bg-[#0C1A25]"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="font-medium">Location</label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        className="input input-bordered bg-[#0C1A25]"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="font-medium">Contact</label>
                                    <input
                                        type="text"
                                        name="contact"
                                        value={formData.contact}
                                        onChange={handleInputChange}
                                        className="input input-bordered bg-[#0C1A25]"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="font-medium">Salary</label>
                                    <input
                                        type="text"
                                        name="salary"
                                        value={formData.salary}
                                        onChange={handleInputChange}
                                        className="input input-bordered bg-[#0C1A25]"
                                    />
                                </div>
                            </div>
                            <div className="modal-action">
                                <button type="submit" className="btn bg-[#0C1A25] text-white border-none hover:bg-[#0d1e2b] hover:px-5 transition-all duration-300"><label htmlFor="my_modal_7" className='cursor-pointer'>Save</label> </button>
                                <label htmlFor="my_modal_7" className="btn bg-[#0C1A25] text-white border-none hover:bg-[#0d1e2b] hover:px-5 transition-all duration-300">Cancel</label>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page;
