import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const managerCookie = request.cookies.get('manager_access');
    const teacherCookie = request.cookies.get('teacher_access');

    const url = request.nextUrl.clone();


    if (!teacherCookie) {
        if (!managerCookie) {

            if (url.pathname.includes("teacher")) {
                url.pathname = "/login";
                return NextResponse.redirect(url);
            }

        }
    }

    if (!teacherCookie) {
        if (managerCookie) {
            if (url.pathname.includes("teacher")) {
                url.pathname = "/";

                return NextResponse.redirect(url);
            }
        }
    }


    if (!managerCookie) {
        if (!teacherCookie) {
            if (url.pathname.includes("admin")) {
                url.pathname = "/login";

                return NextResponse.redirect(url);
            }
        }
    }
    if (!managerCookie) {
        if (teacherCookie) {
            if (url.pathname.includes("admin")) {
                url.pathname = "/";
                return NextResponse.redirect(url);
            }
        }
    }


    return NextResponse.next();
}
