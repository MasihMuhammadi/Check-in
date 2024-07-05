import Link from 'next/link';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProfileIcon from '../../../public/smallIcons/profileIcon';
import { setIsLoggedIn, setWhoIsLoggedIn } from '../../../redux/slices/authSlice';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const NavMenu = ({ cursorBurger, setCursorBurger }: { cursorBurger: any, setCursorBurger: any }) => {
    const isLoggedIn = useSelector((state: any) => state.authSlice.whoLoggedIn)
    const dispatch = useDispatch()
    const router = useRouter()

    const logoutUser = async () => {
        try {
            await axios.post("http://localhost:5000/api/logout", "", { withCredentials: true })
            router.push("/login")
            dispatch(setIsLoggedIn(false))
            dispatch(setWhoIsLoggedIn(""))
            setCursorBurger(false)
        }
        catch (err) {
            console.log(err)
        }
    }
    const closeBurgerMenu = () => {
        setCursorBurger(false)
    }
    return (
        <>
            <div>
                <div className='border border-primary bg-primary rounded-tl-2xl rounded-bl-2xl px-10  h-auto w-104 z-[999] pb-5'>
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

                        {isLoggedIn ?
                            <p className='mx-6 mt-6 border-b w-full text-center cursor-pointer' onClick={logoutUser}>
                                Profile
                            </p>
                            :

                            <Link className="mx-6 mt-6 border-b w-full text-center" href="/login" onClick={closeBurgerMenu}>
                                Login
                            </Link>
                        }
                        {
                            isLoggedIn ?
                                <p className='mx-6 mt-6 border-b w-full text-center cursor-pointer' onClick={logoutUser}>
                                    Sign Out
                                </p>
                                :
                                <Link className="mx-6 mt-6 border-b w-full text-center" href="/signUp" onClick={closeBurgerMenu}>
                                    Sign Up
                                </Link>
                        }
                    </nav>
                </div>
            </div>
        </>
    );
};

export default NavMenu;