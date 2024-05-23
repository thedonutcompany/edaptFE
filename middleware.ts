// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");

  if (request.nextUrl.pathname.startsWith("/signin") && token) {
    return NextResponse.redirect(new URL("/dashboard/profile", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/signin", "/dashboard/:path*"],
};