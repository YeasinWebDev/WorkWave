'use client'
import React, { useEffect, useState } from 'react'
import Text from './Text'
import Hero_Text from './Hero_Text'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Testimonials = () => {

  const reviews = [
    {
      "companyLogo": "https://res.cloudinary.com/dlrktntvb/image/upload/v1726493467/Pngtree_wolf_logo_2306634_slujw3.png",
      "companyName": "TechSolutions",
      "review": "This platform has made managing our HR and payroll seamless. The automation feature is a game changer, reducing errors significantly. We now spend far less time on manual entries, and the intuitive interface has enabled our team to work more efficiently. It’s saved us hours every week!",
      "personName": "Sarah Johnson",
      "personPosition": "HR Manager",
      "personImage": 'https://res.cloudinary.com/dlrktntvb/image/upload/v1726494153/AdobeStock_620224302_Preview_mbkmfk.png'
    },
    {
      "companyLogo": "https://res.cloudinary.com/dlrktntvb/image/upload/v1726493459/Pngtree_environmental_protection_natural_environment_logo_9203785_pmpvsq.png",
      "companyName": "InnovateCorp",
      "review": "This tool has allowed us to streamline our operations with great efficiency. We’ve noticed a huge improvement in compliance and workflow. Employee satisfaction has reached new heights since we’ve made the switch to this platform. We couldn’t be happier with the results!",
      "personName": "Michael Lee",
      "personPosition": "CEO",
      "personImage": 'https://res.cloudinary.com/dlrktntvb/image/upload/v1726494142/AdobeStock_713979070_Preview_eqw2fa.png'
    },
    {
      "companyLogo": "https://res.cloudinary.com/dlrktntvb/image/upload/v1726493450/Pngtree_dove_logo_template_vector_15322095_kxe9bk.png",
      "companyName": "GlobalTech",
      "review": "The automated payroll system has made a massive impact. We save time and minimize errors, thanks to the streamlined interface. The customer support is always responsive and quick to assist, which gives us great peace of mind.",
      "personName": "Emily Davis",
      "personPosition": "Finance Director",
      "personImage": 'https://res.cloudinary.com/dlrktntvb/image/upload/v1726494132/AdobeStock_632001968_Preview_wjgza3.png'
    },
    {
      "companyLogo": "https://res.cloudinary.com/dlrktntvb/image/upload/v1726493443/Pngtree_home_house_real_estate_property_5181201_xn5pcm.png",
      "companyName": "NextGen",
      "review": "Managing our expanding team has never been easier. The platform is loaded with valuable features that simplify the most complex tasks, all while being user-friendly. It’s been a fantastic investment for us!",
      "personName": "James Carter",
      "personPosition": "Operations Manager",
      "personImage": 'https://res.cloudinary.com/dlrktntvb/image/upload/v1726494125/AdobeStock_601488690_Preview_vhykns.png'
    },
    {
      "companyLogo": "https://res.cloudinary.com/dlrktntvb/image/upload/v1726493435/Pngtree_m_letter_logo_free_vector_5157136_fflrda.png",
      "companyName": "CloudNet",
      "review": "The platform’s compliance features are simply unmatched. Managing HR processes, which used to be a headache, is now incredibly smooth and efficient. It’s really improved the overall workflow for our team.",
      "personName": "Olivia Martinez",
      "personPosition": "Chief People Officer",
      "personImage": 'https://res.cloudinary.com/dlrktntvb/image/upload/v1726494171/AdobeStock_638646223_Preview_r9kfah.png'
    },
    {
      "companyLogo": "https://res.cloudinary.com/dlrktntvb/image/upload/v1726493426/Pngtree_bird_logo_vector_design_free_3557165_jg5b4i.png",
      "companyName": "AlphaTech",
      "review": "The software has made a real difference in reducing payroll errors. Employee morale has noticeably improved, and the interface is easy to navigate. I would highly recommend it to anyone dealing with payroll complexities!",
      "personName": "William Turner",
      "personPosition": "Payroll Supervisor",
      "personImage": 'https://res.cloudinary.com/dlrktntvb/image/upload/v1726494163/AdobeStock_759770325_Preview_ymqmad.png'
    }
  ];


  const [currentReview, setCurrentReview] = useState(reviews[0]);

  useEffect(() => {
    const testimonialselement = document.getElementById('testimonials')
    if (testimonialselement) {
      gsap.registerPlugin(ScrollTrigger);
      gsap.fromTo(".review", {
        y: 50,
        opacity: 0,
        duration: 1,
      }, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: '.review',
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        }
      })
    }
  }, [currentReview])

  useEffect(() => {

    const testimonialselement = document.getElementById('testimonials')
    const animation = () => {
      gsap.registerPlugin(ScrollTrigger);
      gsap.fromTo('.heroTextofTes',
        { y: 100, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: {
            trigger: '.heroTextofTes',
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          }
        }
      );

      gsap.utils.toArray('.review-img').forEach((img, index) => {
        gsap.fromTo(img, {
          y: 100,
          opacity: 0,
        }, {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: img,
            start: "top 80%",
            end: "bottom 10%",

            toggleActions: "play none none reverse",
          }
        });
      });
    }

    if(testimonialselement) {
      animation()
    }
  }, [])


  return (
    <div id='testimonials' className='mt-20 py-20 flex items-center flex-col bg-[#14161B] rounded-xl gap-3'>

      <Text text={'Testimonials'} />

      <div className='flex items-center justify-center w-full heroTextofTes'>
        <Hero_Text type='test' text='Hear from our users' />
      </div>

      <div className="review text-white text-center bg-[#111317] py-10 rounded-2xl px-10 lg:w-[70%] w-[90%] mx-auto">
        <div className='flex items-center justify-center py-3'>
          <img src={currentReview.companyLogo} alt={currentReview.companyName} className="h-16 mb-4" />
          <p className="text-3xl font-bold mb-2">{currentReview.companyName}</p>
        </div>
        <p className="mb-4 text-xl">{`"${currentReview.review}"`}</p>
        <p className="font-bold">{currentReview.personName}</p>
        <p className="text-sm text-blue-600 font-semibold">{currentReview.personPosition}</p>
      </div>

      {/* Person images */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
        {reviews.map((review, index) => (
          <img
            key={index}
            src={review.personImage}
            alt={review.personName}
            className={` w-40 h-40 object-cover review-img rounded-2xl cursor-pointer border-8 ${currentReview.personName === review.personName ? 'border-[#0b709e]' : 'border-[#2A2D33]'}`}
            onClick={() => setCurrentReview(review)}
          />
        ))}
      </div>
    </div>
  )
}

export default Testimonials;
