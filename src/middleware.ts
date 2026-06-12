import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  console.log("Middleware Running:", req.nextUrl.pathname);

  const token = req.cookies.get("token")?.value;
  const authRoutes = ["/auth/login", "/auth/register"];

  const isAuthRoute = authRoutes.includes(req.nextUrl.pathname);

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  const protectedRoutes = ["/dashboard", "/resume"];

  const isProtectedRoute = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route),
  );

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/resume/:path*",
    "/auth/login",
    "/auth/register",
  ],
};
