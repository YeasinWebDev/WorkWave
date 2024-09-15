import React from 'react'

const Hero_Text = ({ text, type }) => {
    return (
        <h1 className={`${type ? ' text-[5vw] md:text-[3vw] lg:text-[2vw] xl:text-[2vw]'
                :
                ' text-[6.6vw] md:text-[4vw] lg:text-[3vw] xl:text-[3.5vw]'
            } 
         text-white font-semibold w-[90%] md:w-[80%] lg:w-[65%]  xl:w-[65%]`}>
            {text}
        </h1>
    )
}

export default Hero_Text