import React from 'react'
import Text from './Text'
import { IoIosArrowForward } from "react-icons/io";
import { BackgroundBeams } from './ui/background-beams';

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
                <h1 className='font-semibold w-[90%] md:w-[80%] lg:w-[65%]  xl:w-[60%] text-[6.6vw] md:text-[4vw] lg:text-[3vw] xl:text-[3.5vw] text-white'>
                    Upgrade your HR and Payroll systems today
                </h1>
                <p className='w-[90%] md:w-[80%] lg:w-[65%] xl:w-[50%] mx-auto text-[#9C9D9F] text-sm pt-3 border-b-[1px] border-[#414346] pb-5'>
                    Optimize your operations, maintain compliance, and boost employee satisfaction with our comprehensive HR and payroll solution.
                </p>
                <button className='bg-blue-500 text-white px-4 py-2 rounded-full text-[16px] hover:bg-blue-700 flex items-center gap-3 mt-10 text-lg'>Get Started <IoIosArrowForward size={20} /></button>

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