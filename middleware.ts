// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("access_token");

  if (request.nextUrl.pathname === "/signin" && accessToken) {
    return NextResponse.redirect(new URL("/dashboard/homepage", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/dashboard") && !accessToken) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  if (request.nextUrl.pathname === "/" && accessToken) {
    return NextResponse.redirect(new URL("/dashboard/homepage", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/signin", "/dashboard/:path*"],
};
