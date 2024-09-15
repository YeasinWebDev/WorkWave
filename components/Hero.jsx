import React from 'react'
import Text from './Text'
import { IoIosArrowForward } from "react-icons/io";
import { BackgroundBeams } from './ui/background-beams';
import Hero_Text from './Hero_Text';
import Hero_para from './Hero_para';

const Hero = () => {
    const img= [
        'https://res.cloudinary.com/dlrktntvb/image/upload/v1726331368/p-1_qc8pov.webp',
        'https://res.cloudinary.com/dlrktntvb/image/upload/v1726331375/p-2_tswgvn.webp',
        'https://res.cloudinary.com/dlrktntvb/image/upload/v1726331382/p-3_kn8s4p.webp',
        'https://res.cloudinary.com/dlrktntvb/image/upload/v1726331389/p-4_xn0znz.webp'
    ]
    return (
        <div  className='pt-10'>
            <Text text='Meet WorkWave' />
            <div className='flex flex-col items-center justify-center text-center pt-5'>
                <Hero_Text text='Upgrade your HR and Payroll systems today'/>
                <Hero_para text='Optimize your operations, maintain compliance, and boost employee satisfaction with our comprehensive HR and payroll solution.'/>
                <button className='bg-blue-500 text-white px-4 py-2 rounded-full text-[16px] hover:bg-blue-700 flex items-center gap-3 mt-10 text-lg cursor-pointer z-10'>Get Started <IoIosArrowForward size={20} /></button>

                <p className='text-[#9C9D9F] pt-8'>
                    Used by leading companies around the world
                </p>
                <div className='flex flex-wrap items-center justify-center'>
                    {img.map((i, index) => (
                        <img key={index} className='w-40 object-cover rounded-full' src={i} alt='company logo' />
                    ))}
                </div>
            </div>
            <BackgroundBeams />
        </div >
    )
}

export default Hero