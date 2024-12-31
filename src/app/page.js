import React from 'react'
import Navbar from '@/components/Navbar'

function Indexpage() {
  return (
    <div>
      <Navbar />
      <div className='w-full flex justify-around items-center p-10'>
        <section className=' w-[50%] text-6xl flex items-center justify-center h-auto'>"Hello every one" </section>
        <section className='w-[50%] flex items-center justify-center h-auto'> My name is vahid</section>
      </div>
    </div>
  )
}

export default Indexpage