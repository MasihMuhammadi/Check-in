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
import Buttons from "./buttons";
import { setShowConfirmationPrompt } from "../../redux/slices/headerSlice";
import HomeIcon from "../../public/smallIcons/homeIcon";

const Header = () => {
  const [crossBurger, setCrossBurger] = useState(false);
  const dispatch = useDispatch();


  const courseData = useSelector((state: any) => state.courseSlice.teacherSignUpData);
  const managerData = useSelector((state: any) => state.authSlice.managerData);
  const teacherData = useSelector((state: any) => state.authSlice.loggedTeacher);
  const isLoggedIn = useSelector((state: any) => state.authSlice.isLoggedIn);
  const whoIsLoggedIn = useSelector((state: any) => state.authSlice.whoLoggedIn);
  const confirmationPrompt = useSelector((state: any) => state.headerSlice.showPrompt);
  const [showDropDown, setShowDropDown] = useState(false)

  const [showPrompt, setShowPrompt] = useState(false);
  const router = useRouter();
  const showConfirmation = () => {
    setShowPrompt(true);
    dispatch(setShowConfirmationPrompt(true));
  };

  const logoutUser = async () => {
    try {
      await axios.post("http://localhost:5000/api/logout", "", { withCredentials: true });
      router.push("/login");
      dispatch(setIsLoggedIn(false));
      dispatch(setWhoIsLoggedIn(""));
      setShowPrompt(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = () => {
    setShowPrompt(false);
  };

  const managerHandle = managerData?.data?.data?.handle;
  const teacherHandle = teacherData?.teacherData?.handle;
  const courseWithTeacherHandle = teacherData?.courseData?.data?.handle;


  return (
    <div className="">
      {showPrompt &&
        <div className="h-screen w-screen fixed top-0 left-0 z-50">
          <div className="absolute top-0 left-0 w-full h-full bg-gray-800 opacity-50 z-40"></div>
          <div className="flex flex-col justify-center items-center z-50 absolute inset-0">
            <div className="bg-white border border-black h-[200px] w-[500px] rounded-md p-4">
              <p className="border-b border-black mb-6 text-xl pb-2">Are you sure you want to logout?</p>
              <div className="flex gap-x-4 justify-end mt-20">
                <Buttons primary={true} style="px-8" clickHandler={logoutUser}>Ok</Buttons>
                <Buttons secondary={true} style="px-4" clickHandler={handleCancel}>Cancel</Buttons>
              </div>
            </div>
          </div>
        </div>
      }
      <div className="flex flex-row justify-between items-center z-10 relative">
        <div className="hidden sm:hidden md:flex lg:flex">
          <Navbar />
        </div>
        <div className="py-2 ">
          <Link href={"/"}>
            <EduEchoLogo />
          </Link>
        </div>
        <div className="hidden sm:hidden md:block lg:block relative">
          {whoIsLoggedIn == "manager" || whoIsLoggedIn == "teacher" ? (
            <>
              <div onClick={() => setShowDropDown(!showDropDown)} className="pr-5 cursor-pointer">

                <ProfileIcon width={28} height={28} />
              </div>
              <div className="absolute right-4">
                {showDropDown && <div className="bg-gray-100 shadow-lg  flex flex-col border px-5 py-4 rounded">
                  <Link className="border-b flex gap-x-2 border-b-black pb-2" href={whoIsLoggedIn == "manager" ? `/courses/admin/${managerHandle}` : `courses/${courseWithTeacherHandle}/teacher/${teacherHandle}`}>
                    <HomeIcon />
                    Profile
                  </Link>
                  <div className="cursor-pointer flex gap-x-2 mt-2" onClick={showConfirmation}>
                    <LogoutIcon width={20} height={20} />
                    Logout
                  </div>
                </div>}

              </div>
            </>
          ) : (
            <ToggleButton />
          )}
        </div>
        <div className="flex sm:flex relative md:hidden lg:hidden w-8 h-8 z-10">
          <div className="absolute top-0">
            <BurgerLines crossBurger={crossBurger} setCrossBurger={setCrossBurger} />
          </div>
          <div className="mt-4">
            <div className={`transition-all duration-300 ${crossBurger ? "-translate-x-[350px] flex" : "translate-x-[420px]"}`}>
              <NavMenu setCursorBurger={setCrossBurger} cursorBurger={crossBurger} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
