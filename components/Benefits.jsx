'use client'
import React, { useEffect } from 'react'
import Text from './Text'
import { FaDollarSign } from "react-icons/fa6";
import { LiaUmbrellaBeachSolid } from "react-icons/lia";
import { SiGoogleanalytics } from "react-icons/si";
import { HoverEffect } from './ui/card-hover-effect';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

const Benefits = () => {
    const data = [
        {
            logo: <FaDollarSign size={24} color='#0BA5EC' />,
            text: 'Effortless payroll handling',
            para: 'Effortlessly manage wage calculations, deductions, and taxes with pinpoint accuracy.'
        },
        {
            logo: <LiaUmbrellaBeachSolid size={24} color='#0BA5EC' />,
            text: 'Employee self-service portal',
            para: 'Access to personal HR data is made simple for employees, bypassing HR'
        },
        {
            logo: <SiGoogleanalytics size={24} color='#0BA5EC' />,
            text: 'HR analytics and reports .',
            para: 'Unlock valuable insights into your workforce with our real-time HR analytics and reporting'
        }
    ]

    useEffect(() => {
        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);

        // Animate heading text on scroll
        gsap.fromTo('.benefits-heading', {
            opacity: 0,
            y: -100,
        }, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.benefits-heading',
                start: 'top 80%',
                end: 'top 50%',
                toggleActions: 'play none none reverse',
            }
        });

        // Animate description text on scroll
        gsap.fromTo('.benefits-description', {
            opacity: 0,
            y: -100,
        }, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.benefits-description',
                start: 'top 80%',
                end: 'top 50%',
                toggleActions: 'play none none reverse',
            }
        });

        // Animate image on scroll
        gsap.fromTo('.benefits-image', {
            opacity: 0,
            scale: 0.5,
        }, {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.benefits-image',
                start: 'top 80%',
                end: 'top 50%',
                toggleActions: 'play none none reverse',
            }
        });

        // Animate cards (hover effects) on scroll
        gsap.fromTo('.hover-effect-card', {
            opacity: 0,
            y: 100,
        }, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            stagger: 0.5,
            scrollTrigger: {
                trigger: '.hover-effect-card',
                start: 'top 80%',
                end: 'top 50%',
                toggleActions: 'play none none reverse',
            }
        });
    }, []);

    return (
        <div id='benefits' className='py-20'>
            <Text text='Benefits' />
            <div className='flex items-center justify-center gap-5 pt-5 flex-col md:flex-row'>
                <div className='w-full'>
                    <h1 className='text-[5vw] md:text-[3vw] lg:text-[2vw] xl:text-[2vw] text-white font-semibold benefits-heading'>
                        Boost your HR team’s efficiency with robust tools
                    </h1>
                    <p className='text-[#9C9D9F] text-sm pt-3 pb-3 benefits-description'>
                        Explore how our app enhances efficiency, cuts down on mistakes, and increases employee involvement
                    </p>
                </div>
                <img className='w-full md:w-[40vw] benefits-image' src="https://res.cloudinary.com/dlrktntvb/image/upload/v1726396628/Screenshot_2024-09-15_162830_mjxuyz.png" alt="" />
            </div>

            <div className='flex flex-wrap justify-center gap-10'>
                <HoverEffect items={data} className="hover-effect-card" />
            </div>
        </div>
    )
}

export default Benefits
