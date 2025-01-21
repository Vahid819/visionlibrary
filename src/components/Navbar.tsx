import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

function Navbar() {
    return (
        <div className='w-full h-28 bg-transparent border-b-2 rounded-b-3xl flex justify-around items-center'>
            <div className="logo">
                Logo
            </div>
            <div className="menu gap-4 flex">
                <Link href={'/'} className="transition-all hover:underline hover:decoration-4 underline-offset-4">Home</Link>
                <Link href={'/about'} className="transition-all hover:underline hover:decoration-4 underline-offset-4">About</Link>
                <Link href={'/contact'} className="transition-all hover:underline hover:decoration-4 underline-offset-4">Contact</Link>
            </div>
            <div className="registretion gap-10 flex">
                <Button>SignIn</Button>
                <Button>signUp</Button>
            </div>
        </div>
    )
}

export default Navbar