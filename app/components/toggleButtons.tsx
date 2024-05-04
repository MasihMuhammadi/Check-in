import { useEffect, useState } from "react";
import Link from "next/link";

const ToggleButton = () => {
  const [toggleSignButton, setToggleSignButton] = useState("SignUp");

  useEffect(() => {
    if (window.location.href.includes("login")) {
      setToggleSignButton("Login");
    } else {
      setToggleSignButton("SignUp");
    }
  }, []); // Remove toggleSignButton from dependency array

  return (
    <div className="relative p-[8px] z-0 rounded-2xl flex justify-between shadow-[0_35px_35px_rgba(0,0,0,0.25)]">
      <Link href="/signUp">
        <div
          className={`${
            toggleSignButton === "SignUp" ? "text-white" : "text-[#1e1e1e]"
          } cursor-pointer whitespace-nowrap rounded-lg px-5 sm:px-7 py-2 sm:py-[10px] text-xs sm:text-sm font-semibold w-[89px] sm:w-[124px] flex justify-center`}
          onClick={() => setToggleSignButton("SignUp")}
        >
          SignUp
        </div>
      </Link>
      <div
        className={`transition-all duration-300 absolute  rounded-3xl top-1/2  ${
          toggleSignButton === "SignUp"
            ? "translate-x-0 bg-gradientPrimary w-[89px] sm:w-[124px] h-10 sm:h-11 z-1"
            : "bg-gradientPrimary translate-x-full"
        } -translate-y-1/2 z-[-1] w-[89px] sm:w-[124px] h-8 sm:h-11`}
      ></div>
      <div
        className={`${
          toggleSignButton === "Login" ? "text-white" : "text-[#1e1e1e]"
        } cursor-pointer rounded-lg px-5 whitespace-nowrap sm:px-7 py-2 sm:py-[10px] text-xs sm:text-sm font-semibold w-[89px] sm:w-[124px] flex justify-center`}
        onClick={() => setToggleSignButton("Login")}
      >
        <Link href="/login">Login</Link>
      </div>
    </div>
  );
};

export default ToggleButton;
