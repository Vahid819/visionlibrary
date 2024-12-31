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
import Link from 'next/link'

function Navbar() {
    return (
        <div className='w-full h-16 flex justify-around items-center'>
            <div>
                Logo
            </div>
            <div className='flex justify-around w-[15%]'>
                <div className='signin'>
                    <Dialog>
                        <DialogTrigger className='border-gray-500 border-2 rounded-lg p-1 w-20'>Sign In</DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle  className='text-center'>Sign In</DialogTitle>
                            </DialogHeader>
                            <DialogFooter>
                                <Button type="submit">Login</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
                <div className='signup'>
                    <Dialog>
                        <DialogTrigger className='border-gray-500 border-2 rounded-lg p-1 w-20'>Sign Up</DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className='text-center'>Sign Up</DialogTitle>
                            </DialogHeader>
                            <DialogFooter>
                                <Button type="submit">Create Account</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    )
}

export default Navbar