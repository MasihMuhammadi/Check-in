import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    // Get the 'loggedIn' cookie
    const loggedIn: any = request.cookies.get('loggedIn');

    // Check the condition and redirect based on it
    if (loggedIn === 'true') {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // If the user is logged in, allow the request to proceed
    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/teacher/:path*'],
}
