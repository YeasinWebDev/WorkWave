'use client'
import React from 'react'
import Text from './Text'
import { FaDollarSign } from "react-icons/fa6";
import { LiaUmbrellaBeachSolid } from "react-icons/lia";
import { SiGoogleanalytics } from "react-icons/si";
import { HoverEffect } from './ui/card-hover-effect';



const Benefits = () => {
    const data = [
        {
            logo: <FaDollarSign size={24} color='#0BA5EC' />,
            text: 'Effortless payroll handling',
            para: 'Effortlessly manage wage calculations, deductions, and taxes with pinpoint accuracy.'
        },
        {
            logo: <LiaUmbrellaBeachSolid size={24} color='#0BA5EC' />,
            text: 'Advanced employee self-service portal',
            para: 'Access to personal HR data is made simple for employees, bypassing HR'
        },
        {
            logo: <SiGoogleanalytics size={24} color='#0BA5EC' />,
            text: 'HR analytics and reports in real-time.',
            para: 'Unlock valuable insights into your workforce with our real-time HR analytics and reporting'
        }
    ]
    return (
        <div className='py-20'>
            <Text text='Benefits' />
            <div className='flex items-center justify-center gap-5 pt-5 flex-col md:flex-row'>
                <div className='w-full '>
                    <h1 className='text-[5vw] md:text-[3vw] lg:text-[2vw] xl:text-[2vw] text-white font-semibold'>Boost your HR team’s efficiency with robust tools</h1>
                    <p className='text-[#9C9D9F] text-sm pt-3 pb-3'>Explore how our app enhances efficiency, cuts down on mistakes, and increases employee involvement</p>
                </div>
                <img className=' w-full md:w-[40vw]' src="https://res.cloudinary.com/dlrktntvb/image/upload/v1726396628/Screenshot_2024-09-15_162830_mjxuyz.png" alt="" />
            </div>

            <div className='flex flex-wrap justify-center gap-10'>
                <HoverEffect items={data}/>
            </div>
        </div>
    )
}

export default Benefits
