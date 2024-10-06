'use client'
import { useEffect, useState } from 'react';
import NavButton from './NavButton';
import gsap from 'gsap';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false); // For user info dropdown
    const { data: session } = useSession();
    const user = session?.user;
    const router = useRouter();

    const navList = [
        { label: 'About', href: '#about' },
        { label: 'Benefits', href: '#benefits' },
        { label: 'Integrations', href: '#integrations' },
        { label: 'Pricing', href: '#pricing' },
        { label: 'Testimonials', href: '#testimonials' }
    ];

    const handleLogout = async () => {
        await signOut();
        router.push('/');
    }

    const toggleMenu = () => setIsOpen(!isOpen);
    const toggleDropdown = () => setShowDropdown(!showDropdown); 

    useEffect(() => {
        const navElement = document.querySelector('.nav');
        if (navElement) {
            gsap.fromTo(navElement, 
                { duration: 1.3, opacity: 0, y: -20, ease: 'power2.inOut' }, 
                { duration: 1, opacity: 1, y: 0, ease: 'power2.inOut' }
            );
        }
    }, []);


    return (
        <div className="text-white py-6">
            <div className="nav flex items-center justify-between fixed top-5 z-50 md:w-[80%] lg:w-[80%] xl:w-[60%] w-full pr-10 md:pr-0">
                {/* Company Logo */}
                <img
                    onClick={() => router.push('/')}
                    className="rounded-xl"
                    src='https://res.cloudinary.com/dlrktntvb/image/upload/v1726371226/logo_3_dloihy.png'
                    alt="logo"
                />

                {/* Hamburger Menu for Mobile */}
                <div className="xl:hidden z-10 w-full flex justify-end">
                    <button onClick={toggleMenu} className="text-white focus:outline-none ">
                        <div className="btn btn-circle bg-transparent border-none text-white hover:bg-transparent">
                            {/* Show Hamburger icon when menu is closed */}
                            {!isOpen && (
                                <svg
                                    className="fill-current"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 512 512">
                                    <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                                </svg>
                            )}
                            {/* Show Close icon when menu is open */}
                            {isOpen && (
                                <svg
                                    className="fill-current"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 512 512">
                                    <polygon
                                        points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                                </svg>
                            )}
                        </div>
                    </button>
                </div>

                {/* Navigation Links for larger screens */}
                <div className="hidden xl:flex items-center bg-[#14161B] px-8 py-3 gap-8 rounded-full transition-all duration-500 ease-in-out z-10 text-[#929395]">
                    {navList.map(item => (
                        <NavButton key={item.label} name={item.label} link={item.href} />
                    ))}
                </div>

                {/* User Info and Dropdown */}
                {user ? (
                    <div className='flex items-center justify-center gap-5'>
                        <div className='hidden xl:block bg-[#14161B] text-white pt-4 pb-2 px-5 rounded-full text-[16px] hover:bg-[#14161B] transition-all duration-500 ease-in-out z-10'>
                            <NavButton key={'dashboard'} name={"Dashboard"} link={'/dashboard'} />
                        </div>
                        <div className="relative hidden xl:block">
                            <img
                                onClick={toggleDropdown}
                                className="rounded-full w-12 h-12 cursor-pointer object-cover"
                                src={user?.imgUrl || 'https://via.placeholder.com/150'}
                                alt="User profile"
                            />

                            {/* Dropdown menu for user info */}
                            {showDropdown && (
                                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg p-4">
                                    <p className="font-semibold">{user.name}</p>
                                    <p className="text-sm">{user.email}</p>
                                    <button
                                        onClick={handleLogout}
                                        className="mt-3 w-full bg-[#1D4ED8] text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                        Log Out
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <Link href="/signIn">
                        <button className="hidden xl:block bg-blue-600 text-white py-3 px-5 rounded-full text-[16px] hover:bg-blue-700 transition-all duration-500 ease-in-out z-10">
                            Sign In
                        </button>
                    </Link>
                )}

            </div>

            {/* Mobile Menu */}
            <div className="fixed top-20 z-20">
                <div
                    className={`${isOpen ? 'max-h-96 opacity-100 absolute w-[90vw] md:w-[80vw] translate-y-0' : 'max-h-0 opacity-0 absolute w-full md:w-[60vw] -translate-y-full'
                        } overflow-hidden transition-all duration-500 ease-in-out xl:hidden bg-[#0E192D] px-8 py-3 mt-4 gap-4 rounded-lg flex flex-col items-center z-50 text-[#929395]`}
                >
                    {navList.map(item => (
                        <NavButton key={item.label} name={item.label} link={item.href} />
                    ))}
                    {user ?
                        <div className='flex flex-col items-center'>
                            <div className='text-[16px] transition-all duration-500 ease-in-out z-10'>
                                <NavButton key={'dashboard'} name={"Dashboard"} link={'/dashboard'} />
                            </div>
                            <button
                                onClick={handleLogout}
                                className="mt-3 w-full bg-[#1D4ED8] text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                Log Out
                            </button>
                        </div>
                        :
                        <Link href="/signIn">
                            <button className="bg-blue-500 text-white px-6 py-2 rounded-full text-[16px] hover:bg-blue-700">
                                Sign In
                            </button>
                        </Link>}

                </div>
            </div>
        </div>
    );
};

export default Nav;
