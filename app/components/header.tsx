"use client";

import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useRouter } from "next/navigation";

import ToggleButton from "./toggleButtons";
import Navbar from "./navbar";
import BurgerLines from "./animatedMenu/burgerLines";
import NavMenu from "./animatedMenu/navMenu";
import EduEchoLogo from "../../public/smallIcons/eduEcho";
import ProfileIcon from "../../public/smallIcons/profileIcon";
import LogoutIcon from "../../public/smallIcons/logoutIcon";
import HomeIcon from "../../public/smallIcons/homeIcon";
import Buttons from "./buttons";

import {
  logout,
  setIsLoggedIn,
  setWhoIsLoggedIn,
} from "../../redux/slices/authSlice";

import { setShowConfirmationPrompt } from "../../redux/slices/headerSlice";

const Header = () => {
  const [crossBurger, setCrossBurger] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const dispatch = useDispatch();
  const router = useRouter();

  const auth = useSelector((state: any) => state.authSlice);

  const managerData = auth?.managerData?.data;
  const teacherData = auth?.loggedTeacher;

  const isLoggedIn = auth?.isLoggedIn;
  const whoIsLoggedIn = auth?.whoLoggedIn;

  // Adjust these paths if your API response has a different structure.
  const managerHandle = managerData?.data?.handle ?? managerData?.handle;

  const teacherHandle =
    teacherData?.data?.teacherData?.handle ??
    teacherData?.teacherData?.handle ??
    teacherData?.data?.handle ??
    teacherData?.handle;

  const courseWithTeacherHandle =
    teacherData?.data?.courseData?.data?.handle ??
    teacherData?.courseData?.data?.handle ??
    teacherData?.courseData?.handle;

  const profileHref =
    whoIsLoggedIn === "manager"
      ? managerHandle
        ? `/courses/admin/${managerHandle}`
        : null
      : whoIsLoggedIn === "teacher"
        ? teacherHandle && courseWithTeacherHandle
          ? `/courses/${courseWithTeacherHandle}/teacher/${teacherHandle}`
          : null
        : null;

  const showConfirmation = () => {
    setShowPrompt(true);
    dispatch(setShowConfirmationPrompt(true));
  };

  const handleCancel = () => {
    setShowPrompt(false);
    dispatch(setShowConfirmationPrompt(false));
  };

  const logoutUser = async () => {
    try {
      if (!baseUrl) {
        throw new Error("NEXT_PUBLIC_BACKEND_URL is not configured");
      }

      await axios.post(`${baseUrl}/api/logout`, {}, { withCredentials: true });

      dispatch(logout());
      dispatch(setIsLoggedIn(false));
      dispatch(setWhoIsLoggedIn(""));

      setShowPrompt(false);
      setShowDropDown(false);

      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div>
      {showPrompt && (
        <div className="fixed left-0 top-0 z-50 h-screen w-screen">
          <div className="absolute left-0 top-0 z-40 h-full w-full bg-gray-800 opacity-50" />

          <div className="absolute inset-0 z-50 flex items-center justify-center">
            <div className="h-[200px] w-[min(500px,95vw)] rounded-md border border-black bg-white p-4">
              <p className="mb-6 border-b border-black pb-2 text-xl">
                Are you sure you want to logout?
              </p>

              <div className="mt-12 flex justify-end gap-x-4">
                <Buttons primary={true} style="px-8" clickHandler={logoutUser}>
                  Ok
                </Buttons>

                <Buttons
                  secondary={true}
                  style="px-4"
                  clickHandler={handleCancel}
                >
                  Cancel
                </Buttons>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10 flex flex-row items-center justify-between">
        <div className="hidden md:flex">
          <Navbar />
        </div>

        <div className="py-2">
          <Link href="/">
            <EduEchoLogo />
          </Link>
        </div>

        <div className="relative hidden md:block">
          {isLoggedIn &&
          (whoIsLoggedIn === "manager" || whoIsLoggedIn === "teacher") ? (
            <>
              <button
                type="button"
                aria-label="Open profile menu"
                onClick={() => setShowDropDown((previous) => !previous)}
                className="cursor-pointer pr-5"
              >
                <ProfileIcon width={28} height={28} />
              </button>

              {showDropDown && (
                <div className="absolute right-4 flex flex-col rounded border bg-gray-100 px-5 py-4 shadow-lg">
                  {profileHref ? (
                    <Link
                      className="flex gap-x-2 border-b border-b-black pb-2"
                      href={profileHref}
                      onClick={() => setShowDropDown(false)}
                    >
                      <HomeIcon />
                      Profile
                    </Link>
                  ) : (
                    <p className="border-b border-b-black pb-2 text-sm text-red-600">
                      Profile information is unavailable.
                    </p>
                  )}

                  <button
                    type="button"
                    className="mt-2 flex cursor-pointer gap-x-2 text-left"
                    onClick={showConfirmation}
                  >
                    <LogoutIcon width={20} height={20} />
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <ToggleButton />
          )}
        </div>

        <div className="relative z-10 flex h-8 w-8 md:hidden">
          <div className="absolute top-0">
            <BurgerLines
              crossBurger={crossBurger}
              setCrossBurger={setCrossBurger}
            />
          </div>

          <div className="mt-4">
            <div
              className={`transition-all duration-300 ${
                crossBurger
                  ? "-translate-x-[350px] flex"
                  : "translate-x-[420px]"
              }`}
            >
              <NavMenu
                setCursorBurger={setCrossBurger}
                cursorBurger={crossBurger}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
