import React from 'react'
import Text from './Text'
import Hero_Text from './Hero_Text'
import Hero_para from './Hero_para'
import { IoIosArrowForward } from 'react-icons/io'
import { BackgroundBeamsWithCollision } from './ui/background-beams-with-collision'

const Integrations = () => {
    const Links = [
        'https://res.cloudinary.com/dlrktntvb/image/upload/v1726409211/nextjs-icon_if785n.png',
        'https://res.cloudinary.com/dlrktntvb/image/upload/v1726409219/github-icon_lgenfd.png',
        'https://res.cloudinary.com/dlrktntvb/image/upload/v1726409226/google-firebase-icon_gkvraq.png'
    ]
    return (
        <BackgroundBeamsWithCollision>
            <div className='bg-[#14161B] flex items-center justify-center flex-col py-10 rounded-2xl'>
                <Text text='Integrations' />
                <h1 className='text-[5vw] md:text-[3vw] lg:text-[2vw] xl:text-[2.2vw] text-center text-white font-semibold w-[90%] md:w-[80%] lg:w-[65%]  xl:w-[50%] pt-10'>Expand your potential with effortless integrations</h1>
                <Hero_para type={'Integrations'} text='Our HR and payroll management web app integrates all your HR functions into a single, cohesive hub, streamlining processes and reducing reliance on multiple tools' />
                <div className='flex items-center justify-center flex-col gap-5'>
                    <div className='flex flex-wrap justify-center gap-5'>
                        {Links.map((i, index) => (
                            <div className='bg-[#202227] px-5 py-4 rounded-2xl'>
                                <img key={index} className='w-[4vw] h-[4vw]' src={i} alt="" />
                            </div>
                        ))}
                    </div>

                    <button className='bg-blue-500 text-white px-4 py-2 rounded-full text-[16px] hover:bg-blue-700 flex items-center gap-3 mt-10 text-lg cursor-pointer z-10'>View All Integrations <IoIosArrowForward size={20} /></button>
                </div>
            </div>
        </BackgroundBeamsWithCollision>
    )
}

export default Integrations