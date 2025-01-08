import React from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import SignUpForm from './SignUpForm'
import Link from 'next/link'


function Navbar() {
    return (
        <div className='w-full h-16 flex justify-around items-center'>
            <div>
                Logo
            </div>
            <div className='flex justify-around w-[15%]'>
                <div className='signin' id='signin'>
                    <Dialog>
                        <DialogTrigger className='border-gray-500 border-2 rounded-lg p-1 w-20 hover:scale-105 transition duration-300 ease-in-out '>Sign In</DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className='text-center'>Sign In</DialogTitle>
                                <DialogDescription>If your account are not created then please create your account</DialogDescription>
                            </DialogHeader>

                            <DialogFooter>
                                <Button type="submit">Login</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
                <div className='signup'>
                    <Dialog>
                        <DialogTrigger className='border-gray-500 border-2 rounded-lg p-1 w-20 hover:scale-105 transition duration-300 ease-in-out'>Sign Up</DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className='text-center'>Sign Up</DialogTitle>
                            </DialogHeader>
                            <SignUpForm />
                                <DialogDescription>If your account are create allready then please Login</DialogDescription>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    )
}

export default Navbar