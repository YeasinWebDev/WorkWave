"use client";
import { useEffect, useState } from "react";
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HiOutlineViewGrid } from 'react-icons/hi';
import { IoMdPeople } from 'react-icons/io';
import { GrCompliance } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { MdOutlinePayment, MdLogout } from 'react-icons/md';
import toast from 'react-hot-toast';
import Loader from "@/components/Loader";

function Sidebar() {
    const { data: session, status } = useSession();
    const pathname = usePathname();
    const [activeLink, setActiveLink] = useState('');

    useEffect(() => {
        setActiveLink(pathname);
    }, [pathname]);

    
    if (status === "loading") {
        return <Loader/>
    }

    const handleLogout =  async() => {
        await signOut({ callbackUrl: '/' });
        toast.success("Logged out successfully");
    };

    const isActive = (link) => activeLink === link;

    return (
        <div className='z-10 md:fixed flex flex-col overflow-x-hidden bg-[#07090F] w-64 px-2 py-4 absolute inset-y-0 left-0 transform border-r-2 border-[#1e1f28]'>
            {session && (
                <>
                    <Link href='/'>
                        <div className='cursor-pointer border-gray-600 flex items-center justify-start border-[1px] rounded-xl text-white p-1'>
                            <img
                                className='w-12'
                                src='https://res.cloudinary.com/dlrktntvb/image/upload/v1726374890/logo_1_ak1hxs.png'
                                alt='logo'
                            />
                            <h1 className="flex flex-col flex-1">
                                <span className="text-lg font-semibold">{session.user?.companyName}</span>
                                <span className="text-[10px] text-gray-400"> <span className="text-white">Code:</span> {session.user?.companyCode}</span>
                            </h1>
                            <h1 className="mr-2 border-[1px] p-1 rounded-full border-gray-600 ">{session.user?.employType}</h1>
                        </div>
                    </Link>

                    <div className='mt-10 flex-1'>
                        <div className='px-3 flex flex-col'>
                            {/* Links for HR */}
                            {session.user?.employType === 'HR' ? (
                                <>
                                    <Link href="/dashboard">
                                        <div className={` px-5 flex items-center  gap-2 py-2 font-semibold text-lg rounded-xl  ${isActive('/dashboard') ? 'bg-[#0C1A25] text-white' : 'text-gray-600'}`}>
                                            <HiOutlineViewGrid />
                                            Dashboard
                                        </div>
                                    </Link>
                                    <Link href="/dashboard/people">
                                        <div className={` px-5 py-2 flex items-center gap-2 font-semibold text-lg rounded-xl  ${isActive('/dashboard/people') ? 'bg-[#0C1A25] text-white' : 'text-gray-600'}`}>
                                            <IoMdPeople />
                                            People
                                        </div>
                                    </Link>
                                    <Link href="/dashboard/compliance">
                                        <div className={` px-5 py-2 flex items-center gap-2 font-semibold text-lg rounded-xl  ${isActive('/dashboard/compliance') ? 'bg-[#0C1A25] text-white' : 'text-gray-600'}`}>
                                            <GrCompliance />
                                            Compliance
                                        </div>
                                    </Link>
                                    <Link href="/dashboard/payments">
                                        <div className={` px-5 py-2 flex items-center gap-2 font-semibold text-lg rounded-xl  ${isActive('/dashboard/payments') ? 'bg-[#0C1A25] text-white' : 'text-gray-600'}`}>
                                            <MdOutlinePayment />
                                            Payments
                                        </div>
                                    </Link>
                                    <Link href="/dashboard/profile">
                                        <div className={` px-5 py-2 flex items-center gap-2 font-semibold text-lg rounded-xl  ${isActive('/dashboard/profile') ? 'bg-[#0C1A25] text-white' : 'text-gray-600'}`}>
                                            <CgProfile />
                                            Profile
                                        </div>
                                    </Link>
                                </>
                            ) : (
                                <Link href="/dashboard">
                                    <div className={` px-5 py-2 font-semibold text-lg rounded-xl  ${isActive('/dashboard') ? 'bg-[#0C1A25] text-white' : 'text-gray-600'}`}>
                                        Dashboard
                                    </div>
                                </Link>
                            )}
                        </div>
                    </div>

                    <button className='border-[1px] border-[#181920] text-white py-3 flex items-center justify-between px-2 rounded-lg'>
                        <div className="flex items-center justify-center gap-2">
                            <img className="w-10 rounded-full" src={session.user?.imgUrl} alt="" />
                            <h1 className="text-gray-300">{session.user?.name}</h1>
                        </div>
                        <div onClick={handleLogout} className="border-[1px] rounded-xl p-2 border-[#181920]">
                            <MdLogout color="gray" />
                        </div>
                    </button>
                </>
            )}
        </div>
    );
}

export default Sidebar;
