'use client'
import React from 'react'
import Text from './Text'
import Hero_Text from './Hero_Text'
import Hero_para from './Hero_para'
import { FaDollarSign } from "react-icons/fa6";
import { LiaUmbrellaBeachSolid } from "react-icons/lia";
import { GiInjustice } from "react-icons/gi";
import { SiGoogleanalytics } from "react-icons/si";
import { IoCheckmarkDoneCircle } from "react-icons/io5";

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

    return (
        <div className='pt-10'>
            <Text text='About WorkWave' />
            <div className='flex flex-col items-center justify-center text-center pt-5'>
                <Hero_Text type='about' text='WorkWave is a comprehensive human resources solution' />
                <Hero_para type='about' text='Simplifying HR and payroll management by automating routine tasks, securing employee data, and providing insightful analytics.' />

                <div className='relative border-[1px] border-gray-700 rounded-2xl w-full md:w-[60vw] lg:w-[40vw] xl:w-[30vw] shadow-lg shadow-blue-600'>
                    <img className='w-72 mx-auto' src="https://res.cloudinary.com/dlrktntvb/image/upload/v1726374890/logo_1_ak1hxs.png" alt="WorkWave Logo" />

                    {/* Mapping over the data to display icons and text in 4 different corners */}
                    {data.map((item, index) => (
                        <div
                            key={index}
                            className={`absolute ${positionStyles[item.position]} flex items-center space-x-2 bg-[#14161B] px-4 py-2 rounded-xl`}
                        >
                            {item.logo}
                            <span className='text-white'>{item.text}</span>
                        </div>
                    ))}
                </div>
                <div className='flex items-center justify-center gap-3 flex-wrap py-5'>
                    {
                        text.map((item, index) => (
                            <div key={index} className='flex items-center gap-3'>
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
