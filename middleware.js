import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Allow static files, Next internals, etc.
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/public")
  ) {
    return NextResponse.next();
  }

  // Allow /admin login page
  if (pathname === "/admin") {
    return NextResponse.next();
  }

  // Protect /admin/* pages and /api/* routes
  if (
    pathname.startsWith("/admin/") ||
    (pathname.startsWith("/api/") && !pathname.startsWith("/api/auth/"))
  ) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      // If it's an API request, return 401 JSON instead of redirect
      if (pathname.startsWith("/api/")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      // Otherwise redirect to login page
      const loginUrl = new URL("/admin", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// Enable middleware for both admin pages and API routes
export const config = {
  matcher: ["/admin/:path*", "/api/reports/:path*"],
};
