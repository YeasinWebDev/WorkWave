import React from 'react'
import Hero_Text from './Hero_Text'
import Hero_para from './Hero_para'
import { MdOutlineChevronRight } from "react-icons/md";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"


const AccordionCom = () => {
    const data = [
        {
            title: 'How easy is it to migrate to your system?',
            content: 'Migrating to our system is straightforward. Our team assists with data transfer, ensuring a smooth and secure transition. We provide comprehensive guides and support, helping you configure the system to meet your specific needs with minimal effort.'
        },
        {
            title: 'How do you ensure the security of payroll data?',
            content: 'Yes, our platform is equipped to manage payroll across multiple countries. We support various international payroll requirements, including local tax regulations and currency conversions. Our system is updated in real-time to reflect changes in local laws, ensuring compliance and accuracy in payroll processing for your global workforce.'
        },
        {
            title: 'Can the app handle multi-state payroll compliance?',
            content: 'Yes, our app handles multi-state payroll compliance, including state-specific tax calculations, benefits, and reporting. The system updates in real-time to reflect changes in state laws, ensuring accurate and compliant payroll processing across all the states where your business operates.'
        },
        {
            title: 'Can the platform handle payroll for employees in different countries?',
            content: 'Yes, our platform manages payroll for employees in multiple countries, supporting local tax regulations and currency conversions. It updates in real-time to reflect changes in local laws, ensuring compliance and accuracy in payroll processing for your global workforce.'
        }
    ]
    return (
        <div className='flex items-center justify-center flex-col mt-20 py-10 rounded-2xl'>
            <Hero_Text type='Accordion' text='Frequently asked questions' />
            <Hero_para type='Accordion' text='Still have more questions? Don’t hesitate to contact us!' />
            <button className='border-[1px] rounded-full text-xl text-white px-4 py-2 flex items-center justify-center gap-3 hover:bg-blue-500 hover:border-blue-500'>Contact Us <MdOutlineChevronRight size={26} /></button>

            <div className='text-white lg:w-[80%] mx-auto pt-10'>
                <Accordion type="single" collapsible>
                    {data.map((item, index) => (
                        <AccordionItem className='hover:text-[#0B709E] border-t-[1px] my-2' key={index} value={`item-${index + 1}`}>
                            <AccordionTrigger className='text-xl'>{item.title}</AccordionTrigger>
                            <AccordionContent className='text-lg'>{item.content}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>

            </div>
        </div>
    )
}

export default AccordionCom