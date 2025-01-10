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
                <Link href={"sign-In"}><Button>Sign In</Button></Link>
                </div>
                <div className='signup'>
                    <Link href={"sign-Up"}><Button>Sign UP</Button></Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar