'use client'
import React, { useEffect } from 'react'
import Text from './Text'
import Hero_Text from './Hero_Text'
import Hero_para from './Hero_para'
import { FaDollarSign } from "react-icons/fa6";
import { LiaUmbrellaBeachSolid } from "react-icons/lia";
import { GiInjustice } from "react-icons/gi";
import { SiGoogleanalytics } from "react-icons/si";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger';

const About = () => {
    const data = [
        {
            logo: <FaDollarSign size={20} color='red' />,
            text: "Payrolls",
            position: 'top-left'
        },
        {
            logo: <LiaUmbrellaBeachSolid size={20} color='#0BA5EC' />,
            text: 'Time-offs',
            position: 'top-right'
        },
        {
            logo: <GiInjustice size={20} color='#0BA5EC' />,
            text: 'Compliance',
            position: 'bottom-left'
        },
        {
            logo: <SiGoogleanalytics size={20} color='red' />,
            text: "Analytics",
            position: 'bottom-right'
        }
    ]

    const positionStyles = {
        'top-left': 'top-5 left-5',
        'top-right': 'top-5 right-5',
        'bottom-left': 'bottom-5 left-5',
        'bottom-right': 'bottom-5 right-5',
    }

    const text = [
        "Centralized employee management",
        "Real-time compliance updates",
        "Customizable reports",
    ]

    useEffect(() => {
        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);


        gsap.fromTo('.hero-text', {
            opacity: 0,
            y: 100,
        }, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            stagger: 0.3,
            scrollTrigger: {
                trigger: '.aboutsec',
                start: 'top 70%',
                end: 'top 50%',
                toggleActions: 'play none none reverse',
            }
        });
        // Animate icons on scroll
        gsap.fromTo('.icon-card', {
            opacity: 0,
            y: 100,
        }, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            stagger: 0.3,
            scrollTrigger: {
                trigger: '.icon-card',
                start: 'top 80%',
                end: 'top 50%',
                toggleActions: 'play none none reverse',
            }
        });

        // Animate checkmarks text on scroll
        gsap.fromTo('.checkmark-text', {
            opacity: 0,
            x: -50,
        }, {
            opacity: 1,
            x: 0,
            duration: 1.2,
            ease: 'power3.out',
            stagger: 0.2,
            scrollTrigger: {
                trigger: '.checkmark-text',
                start: 'top 80%',
                end: 'top 60%',
                toggleActions: 'play none none reverse',
            }
        });

        // Logo fade-in effect on scroll
        gsap.fromTo('.about-logo', {
            opacity: 0,
            scale: 0.8,
        }, {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'elastic.out(1, 0.75)',
            scrollTrigger: {
                trigger: '.about-logo',
                start: 'top 80%',
                end: 'top 50%',
                toggleActions: 'play none none reverse',
            }
        });
    }, []);

    return (
        <div id='about' className='aboutsec pt-10'>
            <Text text='About WorkWave' />
            <div className='flex flex-col items-center justify-center text-center pt-5'>
                <div className='hero-text flex items-center justify-center'>
                    <Hero_Text type='about' text='WorkWave is a comprehensive human resources solution' />
                </div>
                <div className='hero-text flex items-center justify-center'>
                    <Hero_para type='about' text='Simplifying HR and payroll management by automating routine tasks, securing employee data, and providing insightful analytics.' />
                </div>

                <div className='relative border-[1px] border-gray-700 rounded-2xl w-full md:w-[60vw] lg:w-[40vw] xl:w-[30vw] shadow-lg shadow-blue-600'>
                    <img className='w-72 mx-auto about-logo' src="https://res.cloudinary.com/dlrktntvb/image/upload/v1726374890/logo_1_ak1hxs.png" alt="WorkWave Logo" />

                    {/* Mapping over the data to display icons and text in 4 different corners */}
                    {data.map((item, index) => (
                        <div
                            key={index}
                            className={`absolute ${positionStyles[item.position]} flex items-center space-x-2 bg-[#14161B] px-4 py-2 rounded-xl icon-card`}
                        >
                            {item.logo}
                            <span className='text-white'>{item.text}</span>
                        </div>
                    ))}
                </div>
                <div className='flex items-center justify-center gap-3 flex-wrap py-5'>
                    {
                        text.map((item, index) => (
                            <div key={index} className='flex items-center gap-3 checkmark-text'>
                                <IoCheckmarkDoneCircle size={20} color='#36BFFA' />
                                <span className='text-[#36BFFA]'>{item}</span>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default About
