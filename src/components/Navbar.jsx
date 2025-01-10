import React from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'


function Navbar() {
    return (
        <div className='w-full h-16 flex justify-around items-center'>
            <div>
                Logo
            </div>
            <div className='flex justify-around w-[15%]'>
                <div className='signin' id='signin'>
                <Link href={"sign-In"} ><Button className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-orange-500 duration-300">Sign In</Button></Link>
                </div>
                <div className='signup'>
                    <Link href={"sign-Up"} ><Button className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-orange-500 duration-300">Sign UP</Button></Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar