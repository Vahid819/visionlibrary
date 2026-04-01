import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(req) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = req.nextUrl;

  // 🔁 Redirect logged-in user away from login
  if ((pathname.startsWith("/auth/login") || pathname.startsWith("/auth/signup")) && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // 🔐 Protect dashboard
  if (pathname.startsWith("/dashboard") && !token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};