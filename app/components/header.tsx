"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import ToggleButton from "./toggleButtons";
import Navbar from "./navbar";

import BurgerLines from "./animatedMenu/burgerLines";
import NavMenu from "./animatedMenu/navMenu";
import EduEchoLogo from "../../public/smallIcons/eduEcho";
import LogoutIcon from "../../public/smallIcons/logoutIcon";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setIsLoggedIn } from "../../redux/slices/authSlice";
import { useRouter } from "next/navigation";





const Header = () => {
  const [crossBurger, setCrossBurger] = useState(false)
  const dispatch = useDispatch()

  const isLogedIn = useSelector((state: any) => state.authSlice.isLoggedIn)

  const router = useRouter()
  const logoutUser = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/logout", "", { withCredentials: true })
      router.push("/login")
      dispatch(setIsLoggedIn(false))
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <div className="flex flex-row justify-between items-center z-[1000] ">
        <div className="hidden sm:hidden md:flex lg:flex" >
          <Navbar />
        </div>
        <div className="py-2 ">
          <Link href={"/"}>
            <EduEchoLogo />
          </Link>
        </div>
        <div className="hidden sm:hidden md:flex lg:flex">
          {isLogedIn ? <div className="cursor-pointer" onClick={logoutUser}>
            <LogoutIcon />
          </div> :
            <ToggleButton />
          }

        </div>
        <div className="flex sm:flex relative md:hidden lg:hidden w-8 h-8 z-[1000] ">
          <div className="absolute top-0">
            <BurgerLines crossBurger={crossBurger} setCrossBurger={setCrossBurger} />
          </div>
          <div className='mt-4'>
            {<div className={`transition-all duration-300  ${crossBurger ? "-translate-x-[350px] flex" : "translate-x-[420px]  "}`}> <NavMenu setCursorBurger={setCrossBurger} cursorBurger={crossBurger} /> </div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
