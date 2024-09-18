'use client'
import React, { useEffect, useRef, useState } from 'react'
import Text from './Text'
import Hero_para from './Hero_para'
import { HiCheck } from "react-icons/hi";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Pricing = () => {
    const [selectedTab, setSelectedTab] = useState('Annual');
    const cardRefs = useRef([]);

    const prices = [
        {
            type: 'Annual',
            plans: [
                { name: 'Basic', price: '$50', features: ['Payroll processing for up to 50 employees', 'Basic HR management', 'Employee self-service portal'] },
                { name: 'Pro', price: '$100', features: ['Payroll processing for up to 200 employees', 'Advanced HR management', 'Enhanced reporting and analytics'] },
                { name: 'Enterprise', price: 'Custom', features: ['Unlimited payroll processing', 'Full suite of HR management tools', 'Dedicated account manager'] }
            ]
        },
        {
            type: 'Monthly',
            plans: [
                { name: 'Basic', price: '$5', features: ['Payroll processing for up to 50 employees', 'Basic HR management', 'Employee self-service portal'] },
                { name: 'Pro', price: '$10', features: ['Payroll processing for up to 200 employees', 'Advanced HR management', 'Enhanced reporting and analytics'] },
                { name: 'Enterprise', price: 'Custom', features: ['Unlimited payroll processing', 'Full suite of HR management tools', 'Dedicated account manager'] }
            ]
        }
    ];

    const handleTabClick = (tab) => {
        setSelectedTab(tab);
    };

    const activePlans = prices.find(price => price.type === selectedTab)?.plans || [];


    // Animation trigger
    useEffect(() => {
        if (cardRefs.current.length > 0) {
            gsap.fromTo(cardRefs.current,
                { y: 100, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', stagger: 0.2,
                    scrollTrigger: {
                        trigger: cardRefs.current,
                        start: "top 90%", 
                        end: "bottom 10%",
                        toggleActions: "play none none reverse",
                    }
                }
            );
        }
    }, [activePlans]);


    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Animating the title and description
        gsap.fromTo('.heroText',
            { y: 100, opacity: 0 },
            {
                y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.heroText',
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse",
                }
            }
        );

        gsap.fromTo('.heroPara',
            { y: 100, opacity: 0 },
            {
                y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.heroPara',
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse",
                }
            }
        );
    }, []);

    return (
        <div id='pricing' className='bg-[#071925] mt-20 py-10 flex items-center justify-center flex-col rounded-3xl overflow-hidden'>
            <Text text='Pricing' />
            <h1 className='text-[5vw] md:text-[3vw] lg:text-[2vw] xl:text-[2.2vw] text-center text-white font-semibold w-[90%] md:w-[80%] lg:w-[50%] xl:w-[40%] pt-10 leading-[3rem] heroText'>
                Choose the right plan for your business
            </h1>
            <div className='flex items-center justify-center heroPara'>
                <Hero_para type='Pricing' text='Whether you’re a small startup or a large enterprise, our plans scale to meet your HR and payroll needs.' />
            </div>

            <div className='w-full mt-10'>
                {/* Tabs */}
                <div className="flex justify-center mb-8">
                    <button
                        onClick={() => handleTabClick('Annual')}
                        className={`px-6 py-2 text-white ${selectedTab === 'Annual' ? 'bg-blue-600' : 'bg-gray-700'} rounded-full transition-all duration-300 ease-in-out`}
                    >
                        Annual
                    </button>
                    <button
                        onClick={() => handleTabClick('Monthly')}
                        className={`px-6 py-2 ml-4 text-white ${selectedTab === 'Monthly' ? 'bg-blue-600' : 'bg-gray-700'} rounded-full transition-all duration-300 ease-in-out`}
                    >
                        Monthly
                    </button>
                </div>

                {/* Plans */}
                <div className="flex items-center justify-center gap-3 flex-wrap">
                    {activePlans.map((plan, planIndex) => (
                        <div
                            ref={el => cardRefs.current[planIndex] = el}
                            key={planIndex}
                            className={`p-6 rounded-2xl w-[90%] md:w-[60%] lg:w-[40%] xl:w-[19vw] ${plan.name === 'Pro' ? 'border-2 border-[#0BA5EC] text-white bg-[#142531]' : plan.name === 'Enterprise' ? 'bg-[#0BA5EC] text-white' : 'bg-[#142531] text-white'}`}
                        >
                            <h3 className={`text-xl font-semibold ${plan.name === 'Basic' ? 'text-[#A0A7AC]' : 'text-[#2563EB]'}`}>
                                {plan.name}
                            </h3>
                            <p className="font-bold my-4 border-b-[1px] border-gray-700 py-3">
                                <span className='text-2xl'>{plan.price}</span> {plan.price !== 'Custom' ? 'per user' : ''}
                            </p>

                            <button className={`${plan.name === 'Basic' ? 'bg-[#23323C] w-full py-3 rounded-full hover:bg-blue-700' : plan.name === "Pro" ? 'w-full py-3 rounded-full bg-[#0BA5EC] hover:bg-blue-700' : 'w-full py-3 rounded-full bg-white text-black'} my-3`}>
                                {plan.name === 'Basic' ? 'Get Started' : plan.name === "Pro" ? 'Select Plan' : 'Contact Us'}
                            </button>

                            <h1 className='py-3'>
                                {plan.name === 'Basic' ? (
                                    <p className="text-[#9C9D9F] text-[16px] w-full">
                                        Includes basic features and a free trial
                                    </p>
                                ) : plan.name === "Pro" ? (
                                    <p className="text-[#9C9D9F] text-[16px] w-full">
                                        All basic features and additional features
                                    </p>
                                ) : (
                                    <p className="text-[16px] w-full text-[#9DD8F4]">
                                        Contact us for more information
                                    </p>
                                )}
                            </h1>

                            <ul className="text-left">
                                {plan.features.map((feature, featureIndex) => (
                                    <div key={featureIndex} className='flex gap-2'>
                                        <h1><HiCheck size={22} color={plan.name === 'Enterprise' ? '#3EE089' : plan.name === "Pro" ? '#0BA5EC' : ''} /></h1>
                                        <h1 className="mb-2">{feature}</h1>
                                    </div>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Pricing;
