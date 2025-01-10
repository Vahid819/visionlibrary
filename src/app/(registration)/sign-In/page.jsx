import React from 'react'
import SigninForm from '@/components/SigninForm'
import Link from 'next/link'

function Signin() {
  return (
    <div className='flex justify-center items-center md:h-[100vh]'>
      <div className='md:w-[30%] m-auto md:h-[85%] px-12 py-5 bg-white rounded-lg'>
        <h1 className='text-center text-3xl'>Sign In</h1>
        <SigninForm />
        <h3 className='text-gray-500 text-sm py-2 flex items-center h-10 gap-1'>If your account are not created then go to <Link href={"/sign-Up"} className='hover:text-blue-700 hover:text-lg transition-all duration-300 ease-in-out'>Sign Up</Link></h3>
      </div>
    </div>
  )
}

export default Signin