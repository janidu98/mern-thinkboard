import { ZapIcon } from 'lucide-react'
import React from 'react'

const RateLimitedUI = () => {
  return (
    <div className='max-w-6xl mx-auto px-4 py-8'>
        <div className='bg-primary/10 border border-primary/30 rounded-lg shadow-md'>
            <div className='flex flex-col md:flex-row items-center p-6'>
                <div className='flex-shrink-0 bg-primary/20 p-4 rounded-full mb-4 md:mb-0 md:mr-6'>
                    <ZapIcon className='size-10 text-primary' />
                </div>
                <div className='flex-1 text-center md:text-left'>
                    <h3 className='text-2xl font-semibold text-primary mb-2'>Rate Limit Exceeded</h3>
                    <p className='text-base text-primary/80'>You have exceeded the maximum number of requests allowed. Please wait a moment before trying again.</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default RateLimitedUI
