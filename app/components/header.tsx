"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import ToggleButton from "./toggleButtons";
import Navbar from "./navbar";

import BurgerLines from "./animatedMenu/burgerLines";
import NavMenu from "./animatedMenu/navMenu";
import EduEchoLogo from "../../public/smallIcons/eduEcho";
import ProfileIcon from "../../public/smallIcons/profileIcon";
import LogoutIcon from "../../public/smallIcons/logoutIcon";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setIsLoggedIn, setWhoIsLoggedIn } from "../../redux/slices/authSlice";
import { useRouter } from "next/navigation";





const Header = () => {
  const [crossBurger, setCrossBurger] = useState(false)
  const dispatch = useDispatch()

  const teacherData = useSelector((state: any) => state.teacherSlice.aTeacherData)
  const courseData = useSelector((state: any) => state.courseSlice.teacherSignUpData)
  const isLogedIn = useSelector((state: any) => state.authSlice.isLoggedIn)
  const whoIsLoggedIn = useSelector((state: any) => state.authSlice.whoLoggedIn)

  const router = useRouter()
  const logoutUser = async () => {
    try {
      await axios.post("http://localhost:5000/api/logout", "", { withCredentials: true })
      router.push("/login")
      dispatch(setIsLoggedIn(false))
      dispatch(setWhoIsLoggedIn(""))
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

          {whoIsLoggedIn == "manager" || whoIsLoggedIn == "teacher" ?
            <>
              <div className="flex gap-x-4 mx-5">
                <div className="cursor-pointer" onClick={logoutUser}>
                  <LogoutIcon />
                </div>
                <Link href={`${whoIsLoggedIn == "manager" ? "/" : "/courses"}`}><ProfileIcon width={28} height={28} /></Link>
              </div>
            </>
            :
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
