import React from 'react'
import Navbar from '@/components/Navbar'
import { FaQuoteLeft } from "react-icons/fa";

function Indexpage() {
  return (
    <div>
      <Navbar />
      <div className='w-full flex justify-around items-center p-10'>
        <section className=' w-[50%] text-6xl flex flex-col pl-60 justify-center h-auto'>
          <FaQuoteLeft />
          <div>
            Vision
          </div>
        </section>
        <section className='w-[50%] flex items-center justify-center h-auto'> My name is vahid</section>
      </div>
    </div>
  )
}

export default Indexpage