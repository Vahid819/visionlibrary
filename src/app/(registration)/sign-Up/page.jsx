import React from 'react'
import SignUpForm from '@/components/SignUpForm'
import Link from 'next/link'

function SignUp() {
  return (
    <div className='flex justify-center flex-col items-center md:h-[100vh]'>
      <div className='logo'>logo</div>
      <div className='md:w-[30%] m-auto md:h-[85%] px-12 py-5 bg-white rounded-lg'>
        <h1 className='text-center text-3xl'>Sign Up</h1>
        <SignUpForm />
        <h3 className='text-gray-500 text-sm py-2 flex items-center h-10 gap-1'>If your Account has been created then go to <Link href={"/sign-In"} className='hover:text-blue-700 hover:text-lg transition-all duration-300 ease-in-out'>Log In</Link></h3>
      </div>
    </div>
  )
}

export default SignUp