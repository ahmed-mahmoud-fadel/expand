import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import supportedOS from "@/global/supportedOS";

export function middleware(request: NextRequest) {
  // const userAgent = request.headers.get("User-Agent")
  // const redirect = NextResponse.redirect(new URL('/demo', request.url))
  // if (!userAgent) return redirect
  // if (supportedOS.reduce((p, c) => {
  //   return p || userAgent.match(c) !== null
  // }, false)) return
  // return redirect
}

export const config = {
  matcher: '/demo/:path+',
}