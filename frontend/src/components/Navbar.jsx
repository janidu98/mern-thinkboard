import { PlusIcon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'

const Navbar = () => {
  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className='mx-auto p-4 max-w-6xl'>
        <div className='flex items-center justify-between'>
            <h1 className='text-3xl font-bold text-primary font-mono tracking-tight'>ThinkBoard</h1>
            <div className='flex items-center gap-4'>
                <Link to='/create' className='btn btn-primary'>
                    <PlusIcon className='size-5'/> 
                    New Note
                </Link>
            </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
