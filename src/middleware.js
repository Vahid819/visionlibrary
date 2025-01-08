'use server'

import { NextResponse } from "next/server"

export async function middleware(req) {
    const pathname = req.nextUrl.pathname;
    console.log(pathname)
}