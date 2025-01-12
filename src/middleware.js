'use server'

import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
    const url = req.nextUrl;
    const token = await getToken({req})

    console.log("this is ",url)
    // const ispublicpath = pathname === '/';

    // const token = req.cookies.get('token')?.value || ''

    if(token && (
        url.pathname.startWith('/sign-In') ||
        url.pathname.startWith('/sign-Up') ||
        url.pathname.startWith('/')
    )){
        return NextResponse.redirect(new URL('/dashbord', req.nextUrl))
    }

    if(!url && !token){
        return NextResponse.redirect(new URL('/sign-UP', req.nextUrl))
    }
}

export const config = {
    matcher:[
        '/',
        '/sign-In',
        '/sign-Up',
        '/dashboard/:path*'
    ]

}