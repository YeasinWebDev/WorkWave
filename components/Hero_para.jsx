import React from 'react'

const Hero_para = ({text,type}) => {
    return (
        <p className={`${type ? '' : 'border-b-[1px] border-[#414346]'} w-[90%] md:w-[80%] lg:w-[65%] xl:w-[50%] mx-auto text-[#9C9D9F] text-sm pt-3 pb-5`}>
            {text}
        </p>
    )
}

export default Hero_para