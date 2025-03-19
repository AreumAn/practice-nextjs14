import { NextRequest, NextResponse } from "next/server";
import getSession from "./app/lib/session";

interface PublicRoutes {
  [key: string]: boolean
}

const publicRoutes : PublicRoutes= {
  "/": true,
  "/log-in": true,
  "/create-account": true,
}

export default async function middleware(request: NextRequest) {
  const session = await getSession()
  const isPublic = publicRoutes[request.nextUrl.pathname]
  if(!session.id) {
    // logged out
    if(!isPublic) {
      return NextResponse.redirect(new URL("/", request.url))
    }
  } else {
    // logged in
    if(isPublic) {
      return NextResponse.redirect(new URL("/profile", request.url))
    }
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
