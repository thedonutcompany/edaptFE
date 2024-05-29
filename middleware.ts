// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken");

  if (request.nextUrl.pathname.startsWith("/signin") && accessToken) {
    return NextResponse.redirect(new URL("/dashboard/profile", request.url));
  } else if (
    request.nextUrl.pathname.startsWith("/dashboard") &&
    !accessToken
  ) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/signin", "/dashboard/:path*"],
};
