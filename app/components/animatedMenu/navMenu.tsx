import Link from 'next/link';
import React from 'react';

const NavMenu = () => {
    return (
        <>
            <div>
                <div className='border border-primary bg-primary rounded-tl-2xl rounded-bl-2xl px-10 py-4 h-[300px] w-96 z-[999]'>
                    <nav className=" flex flex-col justify-center bg-primary text-white w-full items-center min-w-80">
                        <Link href="/" className=" mx-6 mt-6 border-b w-full text-center">
                            Home
                        </Link>
                        <Link className="mx-6 mt-6 border-b w-full text-center" href="/about">
                            About
                        </Link>
                        <Link className="mx-6 mt-6 border-b w-full text-center" href="#">
                            Services
                        </Link>
                        <Link className="mx-6 mt-6 border-b w-full text-center" href="/contact">
                            Contact
                        </Link>
                        <Link className="mx-6 mt-6 border-b w-full text-center" href="/courses">
                            Courses
                        </Link>
                    </nav>
                </div>
            </div>
        </>
    );
};

export default NavMenu;