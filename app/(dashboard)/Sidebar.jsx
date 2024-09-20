'use client'
import { MdLogout } from "react-icons/md";
import toast from 'react-hot-toast';
import { signOut, useSession } from 'next-auth/react';
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { HiOutlineViewGrid } from 'react-icons/hi';
import { IoMdPeople } from "react-icons/io";
import { TbReportAnalytics } from "react-icons/tb";
import { MdOutlinePayment } from "react-icons/md";

function Sidebar() {
    const { data: session } = useSession();
    const router = useRouter();
    const pathname = usePathname();
    const [activeLink, setActiveLink] = useState(pathname); 
    
    const handleLogout = () => {
        signOut();
        router.push('/');
        toast.success("Logged out successfully");
    };

    
    const isActive = (link) => activeLink === link;

    const handleLinkClick = (link) => {
        setActiveLink(link); 
    };

    return (
        <div className='z-10 md:fixed flex flex-col overflow-x-hidden bg-[#07090F] w-64 px-2 py-4 absolute inset-y-0 left-0 transform border-r-[1px] border-gray-500'>
            <Link href='/'>
                <div className='cursor-pointer border-gray-600 flex items-center justify-start border-[1px] rounded-xl text-white p-1'>
                    <img
                        className='w-12'
                        src='https://res.cloudinary.com/dlrktntvb/image/upload/v1726374890/logo_1_ak1hxs.png'
                        alt='logo'
                    />
                    <h1 className="flex flex-col flex-1">
                        <span className="text-lg font-semibold">{session?.user?.companyName}</span>
                        <span className="text-[10px] text-gray-400"> <span className="text-white">Code:</span> {session?.user?.companyCode}</span>
                    </h1>
                    <h1 className="mr-2 border-[1px] p-1 rounded-full border-gray-600 ">{session?.user?.employType}</h1>
                </div>
            </Link>

            <div className='mt-10 flex-1'>
                <div className='px-3 flex flex-col'>
                    {/* Links for HR */}
                    {session?.user?.employType === 'HR' ? (
                        <>
                            <Link href="/dashboard" onClick={() => handleLinkClick('/dashboard')}>
                                <div className={` px-5 flex items-center  gap-2 py-2 font-semibold text-lg rounded-xl  ${isActive('/dashboard') ? 'bg-[#0C1A25] text-white' : 'text-gray-600'}`}>
                                <HiOutlineViewGrid/>
                                    Dashboard
                                </div>
                            </Link>
                            <Link href="/dashboard/people" onClick={() => handleLinkClick('/dashboard/people')}>
                                <div className={` px-5 py-2 flex items-center gap-2 font-semibold text-lg rounded-xl  ${isActive('/dashboard/people') ? 'bg-[#0C1A25] text-white' : 'text-gray-600'}`}>
                                <IoMdPeople/>
                                    People
                                </div>
                            </Link>
                            <Link href="/dashboard/reports" onClick={() => handleLinkClick('/dashboard/reports')}>
                                <div className={` px-5 py-2 flex items-center gap-2 font-semibold text-lg rounded-xl  ${isActive('/dashboard/reports') ? 'bg-[#0C1A25] text-white' : 'text-gray-600'}`}>
                                <TbReportAnalytics/>
                                    Reports
                                </div>
                            </Link>
                            <Link href="/dashboard/payments" onClick={() => handleLinkClick('/dashboard/payments')}>
                                <div className={` px-5 py-2 flex items-center gap-2 font-semibold text-lg rounded-xl  ${isActive('/dashboard/payments') ? 'bg-[#0C1A25] text-white' : 'text-gray-600'}`}>
                                <MdOutlinePayment/>
                                    Payments
                                </div>
                            </Link>
                        </>
                    ) : (
                        <>
                            {/* Links for other roles */}
                            <Link href="/dashboard" onClick={() => handleLinkClick('/dashboard')}>
                                <div className={` px-5 py-2 font-semibold text-lg rounded-xl  ${isActive('/dashboard') ? 'bg-[#0C1A25] text-white' : 'text-gray-600'}`}>
                                    Dashboard
                                </div>
                            </Link>
                        </>
                    )}
                </div>
            </div>

            <button className='border-[1px] border-gray-600 text-white py-3 flex items-center justify-between px-2 rounded-lg'>
                <div className="flex items-center justify-center gap-2">
                    <img className="w-10 rounded-full" src={session?.user?.imgUrl} alt="" />
                    <h1 className="text-gray-300">{session?.user?.name}</h1>
                </div>
                <div onClick={handleLogout} className="border-[1px] rounded-xl p-2 border-gray-600">
                    <MdLogout color="gray" />
                </div>
            </button>
        </div>
    );
}

export default Sidebar;
