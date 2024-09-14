import React from 'react'

const Text = ({ text }) => {
    return (
        <div className='flex items-center justify-center'>
            <h1 className='text-[#7CD4FD] shadow shadow-[#7CD4FD] rounded-full p-2 text-sm bg-[#14161B] font-semibold'>{text}</h1>
        </div>
    )
}

export default Text