'use server'

import { NextResponse } from "next/server"

export async function middleware(req) {
    const pathname = req.nextUrl.pathname;
    
    const ispublicpath = pathname === '/';

    const token = req.cookies.get('token')?.value || ''

    if(ispublicpath && token){
        return NextResponse.redirect(new URL('/', req.nextUrl))
    }

    if(!ispublicpath && !token){
        return NextResponse.redirect(new URL('/', req.nextUrl))
    }
}

export const config = {
    matcher:'/'
}