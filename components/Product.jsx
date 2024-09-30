'use client'
import gsap from 'gsap'
import React, { useEffect } from 'react'

const Product = () => {
  useEffect(()=>{
    gsap.fromTo('.img',{
      opacity: 0,
      scale: 0.5
    },{
      opacity: 1,
      scale: 1,
      duration: 1.3,
      ease: 'power3.out'
    })
  },[])
  return (
    <div className='text-white flex items-center justify-center py-10 img'>
      <img className='border-[1px] p-2 rounded-xl border-[#181920]' src="https://res.cloudinary.com/dlrktntvb/image/upload/v1727701470/Screenshot_2024-09-30_190304_kr1omi.png" alt="" />
    </div>
  )
}

export default Product