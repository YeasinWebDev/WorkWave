import React from 'react'
import { Button } from './ui/moving-border'

const Text = ({ text }) => {
    return (
        <div className='flex items-center justify-center'>
            <Button >{text}</Button>
        </div>
    )
}

// className='text-[#7CD4FD] shadow shadow-[#7CD4FD] rounded-full p-2 text-sm bg-[#14161B] font-semibold'
export default Text