'use client'
import React, { useEffect } from 'react'
import Text from './Text'
import Hero_para from './Hero_para'
import { IoIosArrowForward } from 'react-icons/io'
import { BackgroundBeamsWithCollision } from './ui/background-beams-with-collision'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

const Integrations = () => {
    const Links = [
        'https://res.cloudinary.com/dlrktntvb/image/upload/v1726409211/nextjs-icon_if785n.png',
        'https://res.cloudinary.com/dlrktntvb/image/upload/v1726409219/github-icon_lgenfd.png',
        'https://res.cloudinary.com/dlrktntvb/image/upload/v1726409226/google-firebase-icon_gkvraq.png'
    ]

    useEffect(() => {
        // Register ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);

        // Animate heading on scroll
        gsap.fromTo('.integrations-heading', {
            opacity: 0,
            y: -50
        }, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.integrations-heading',
                start: 'top 80%',
                end: 'top 60%',
                toggleActions: 'play none none reverse'
            }
        });

        // Animate paragraph on scroll
        gsap.fromTo('.integrations-paragraph', {
            opacity: 0,
            x: -50
        }, {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.integrations-paragraph',
                start: 'top 80%',
                end: 'top 60%',
                toggleActions: 'play none none reverse'
            }
        });

        // Animate integration icons on scroll with stagger effect
        gsap.fromTo('.integration-icon', {
            opacity: 0,
            scale: 0.8,
        }, {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.2,
            scrollTrigger: {
                trigger: '.integration-icon',
                start: 'top 80%',
                end: 'top 50%',
                toggleActions: 'play none none reverse'
            }
        });

        // Animate button on scroll
        gsap.fromTo('.view-all-button', {
            opacity: 0,
            scale: 0.9
        }, {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.view-all-button',
                start: 'top 80%',
                end: 'top 60%',
                toggleActions: 'play none none reverse'
            }
        });
    }, []);

    return (
        <BackgroundBeamsWithCollision>
            <div id='integrations' className='bg-[#14161B] flex items-center justify-center flex-col py-10 rounded-2xl'>
                <Text text='Integrations' />
                <h1 className='text-[5vw] md:text-[3vw] lg:text-[2vw] xl:text-[2.2vw] text-center text-white font-semibold w-[90%] md:w-[80%] lg:w-[65%] xl:w-[50%] pt-10 integrations-heading'>
                    Expand your potential with effortless integrations
                </h1>
                <div className="integrations-paragraph">

                    <Hero_para type={'Integrations'} text='Our HR and payroll management web app integrates all your HR functions into a single, cohesive hub, streamlining processes and reducing reliance on multiple tools' />
                </div>

                <div className='flex items-center justify-center flex-col gap-5'>
                    <div className='flex flex-wrap justify-center gap-5'>
                        {Links.map((i, index) => (
                            <div key={index} className='bg-[#202227] px-5 py-4 rounded-2xl integration-icon'>
                                <img className='lg:w-[4vw] w-10 lg:h-[4vw] h-10' src={i} alt="" />
                            </div>
                        ))}
                    </div>

                    <button className='bg-blue-500 text-white px-4 py-2 rounded-full text-[16px] hover:bg-blue-700 flex items-center gap-3 mt-10 text-lg cursor-pointer view-all-button'>
                        View All Integrations <IoIosArrowForward size={20} />
                    </button>
                </div>
            </div>
        </BackgroundBeamsWithCollision>
    )
}

export default Integrations
