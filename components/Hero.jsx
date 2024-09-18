'use client'
import React, { useEffect } from 'react'
import Text from './Text'
import { IoIosArrowForward } from "react-icons/io";
import { BackgroundBeams } from './ui/background-beams';
import Hero_Text from './Hero_Text';
import Hero_para from './Hero_para';
import gsap from 'gsap';

const Hero = () => {
    const img = [
        'https://res.cloudinary.com/dlrktntvb/image/upload/v1726331368/p-1_qc8pov.webp',
        'https://res.cloudinary.com/dlrktntvb/image/upload/v1726331375/p-2_tswgvn.webp',
        'https://res.cloudinary.com/dlrktntvb/image/upload/v1726331382/p-3_kn8s4p.webp',
        'https://res.cloudinary.com/dlrktntvb/image/upload/v1726331389/p-4_xn0znz.webp'
    ];

    useEffect(() => {
        const tl = gsap.timeline();

        // Animate the text elements
        tl.fromTo(".heroText", {
            opacity: 0,
            y: 100
        }, {
            opacity: 1,
            y: 0,
            duration: 1.3,
            ease: 'power3.out'
        });

        // Animate the paragraph and button
        tl.fromTo(".hero-para", {
            opacity: 0,
            y: 100
        }, {
            opacity: 1,
            y: 0,
            duration: 1.3,
            ease: 'power3.out'
        }, "-=0.5");

        tl.fromTo(".hero-button", {
            opacity: 0,
            scale: 0.9
        }, {
            opacity: 1,
            scale: 1,
            duration: 1.3,
            ease: 'elastic.out(1, 0.5)'
        }, "-=0.5");

        tl.fromTo(".text", {
            opacity: 0,
            scale: 0.9
        }, {
            opacity: 1,
            scale: 1,
            duration: 1.3,
            ease: 'elastic.out(1, 0.5)'
        }, "-=0.5");

        // Animate the company logo
        tl.fromTo(".company-logo", {
            opacity: 0,
            y: 50
        }, {
            opacity: 1,
            y: 0,
            duration: 1.3,
            ease: 'back.out(1.7)',
            stagger: 0.2
        }, "-=0.2");
    }, []);

    return (
        <div className=' pt-10 overflow-hidden'>
            <Text text='Meet WorkWave' />
            <div className='flex flex-col items-center justify-center text-center pt-5'>
                <div className='heroText flex items-center justify-center'>
                    <Hero_Text text='Upgrade your HR and Payroll systems today' />
                </div>
                <div className='hero-para flex items-center justify-center'>

                    <Hero_para text='Optimize your operations, maintain compliance, and boost employee satisfaction with our comprehensive HR and payroll solution.' />
                </div>
                <button className='hero-button bg-blue-500 text-white px-4 py-2 rounded-full text-[16px] hover:bg-blue-700 flex items-center gap-3 mt-10 text-lg cursor-pointer z-10'>
                    Get Started <IoIosArrowForward size={20} />
                </button>

                <p className='text-[#9C9D9F] pt-8 text'>
                    Used by leading companies around the world
                </p>
                <div className='flex flex-wrap items-center justify-center'>
                    {img.map((i, index) => (
                        <img key={index} className='w-40 object-cover rounded-full company-logo' src={i} alt='company logo' />
                    ))}
                </div>
            </div>
            <BackgroundBeams />
        </div>
    );
}

export default Hero;
