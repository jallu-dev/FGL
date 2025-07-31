import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Allow static files, _next, etc.
  if (pathname.startsWith("/_next") || pathname.startsWith("/favicon.ico")) {
    return NextResponse.next();
  }

  // Allow /admin (login page)
  if (pathname === "/admin") {
    return NextResponse.next();
  }

  // Restrict everything under /admin/*
  if (pathname.startsWith("/admin/")) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      const loginUrl = new URL("/admin", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// Enable middleware for /admin and its children
export const config = {
  matcher: ["/admin/:path*"],
};
