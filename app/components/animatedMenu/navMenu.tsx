import Link from 'next/link';
import React from 'react';

const NavMenu = ({ cursorBurger, setCursorBurger }: { cursorBurger: any, setCursorBurger: any }) => {
    const closeBurgerMenu = () => {
        setCursorBurger(false)
    }
    return (
        <>
            <div>
                <div className='border border-primary bg-primary rounded-tl-2xl rounded-bl-2xl px-10  h-auto w-96 z-[999]'>
                    <nav className=" flex flex-col justify-center bg-primary text-white w-full items-center min-w-80">
                        <Link href="/" className=" mx-6 mt-6 border-b w-full text-center" onClick={closeBurgerMenu}>
                            Home
                        </Link>
                        <Link className="mx-6 mt-6 border-b w-full text-center" href="/about" onClick={closeBurgerMenu}>
                            About
                        </Link>
                        <Link className="mx-6 mt-6 border-b w-full text-center" href="/contact" onClick={closeBurgerMenu}>
                            Contact
                        </Link>
                        <Link className="mx-6 mt-6 border-b w-full text-center" href="/courses" onClick={closeBurgerMenu}>
                            Courses
                        </Link>
                        <Link className="mx-6 mt-6 border-b w-full text-center" href="/login" onClick={closeBurgerMenu}>
                            Login
                        </Link>
                        <Link className="mx-6 mt-6 border-b w-full text-center" href="/signUp" onClick={closeBurgerMenu}>
                            SignUP
                        </Link>
                    </nav>
                </div>
            </div>
        </>
    );
};

export default NavMenu;