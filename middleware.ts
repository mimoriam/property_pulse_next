import { NextResponse } from 'next/server';
import NextAuth from 'next-auth';
import authConfig from '@/auth.config';

const { auth } = NextAuth(authConfig);

export const authRoutes = ['/properties/add'];
export const publicRoutes = ['/', '/properties'];
export const apiAuthPrefix = '/api/auth';

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

  if (isApiAuthRoute) {
    // If routes aren't protected properly, replace this line with below:
    return NextResponse.next();
    // return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.next();
    }
    if (!isLoggedIn) {
      return Response.redirect(new URL('/', nextUrl));
    }
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL('/', nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
