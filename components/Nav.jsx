'use client'
import { useState } from 'react';
import NavButton from './NavButton';

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navList = [
        { label: 'About', href: '/about' },
        { label: 'Benefits', href: '/benefits' },
        { label: 'Integrations', href: '/integrations' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Testimonials', href: '/testimonials' }
    ];

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <div className="text-white py-6">
            <div className="flex items-center justify-between">
                <img src='https://res.cloudinary.com/dlrktntvb/image/upload/v1726371226/logo_3_dloihy.png'/>

                {/* Hamburger Menu for Mobile */}
                <div className="xl:hidden z-10">
                    <button onClick={toggleMenu} className="text-white focus:outline-none">
                        <svg
                            className="w-6 h-6 transition-transform duration-300 ease-in-out transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                            />
                        </svg>
                    </button>
                </div>

                {/* Navigation Links for larger screens */}
                <div className="hidden xl:flex items-center bg-[#14161B] px-8 py-3 gap-8 rounded-full transition-all duration-500 ease-in-out z-10">
                    {navList.map(item => (
                        <NavButton key={item.label} name={item.label} link={item.href} />
                    ))}
                </div>

                {/* Sign In Button */}
                <button className="hidden xl:block bg-blue-500 text-white px-6 py-2 rounded-full text-[16px] hover:bg-blue-700 transition-all duration-500 ease-in-out z-10">
                    Sign In
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`${
                    isOpen ? 'max-h-96 opacity-100 absolute w-[90vw] md:w-[60vw] translate-y-0' : 'max-h-0 opacity-0 absolute w-full md:w-[60vw] -translate-y-full'
                } overflow-hidden transition-all duration-500 ease-in-out xl:hidden bg-[#14161B] px-8 py-3 mt-4 gap-4 rounded-lg flex flex-col items-center z-10`}
            >
                {navList.map(item => (
                    <NavButton key={item.label} name={item.label} link={item.href} />
                ))}
                <button className="bg-blue-500 text-white px-6 py-2 rounded-full text-[16px] hover:bg-blue-700">
                    Sign In
                </button>
            </div>
        </div>
    );
};

export default Nav;
