import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { useAuthStore } from "./stores/auth";

export async function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;

  if (pathname === "/") {
    return NextResponse.next();
  }

  const hasLogin = request.cookies.has("currentUser");

  if (hasLogin) {
    if (["/register", "/login"].includes(pathname)) {
      return NextResponse.redirect(`${origin}/questionnaire`);
    }
    return NextResponse.next();
  } else {
    return NextResponse.redirect(`${origin}/register`);
  }
}

export const config = {
  matcher: [
    "/",
    "/((?!_next/static|favicon.ico|login|).*)",
    "/create/:path*",
    "/questionnaire/:path*",
  ],
};
