"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import ToggleButton from "./toggleButtons";
import Navbar from "./navbar";

import BurgerLines from "./animatedMenu/burgerLines";
import NavMenu from "./animatedMenu/navMenu";
import EduEchoLogo from "../../public/smallIcons/eduEcho";

const Header = () => {
  const [crossBurger, setCrossBurger] = useState(false)

  const [toggleSignButton, setToggleSignButton] = useState<string>("login");
  return (
    <>
      <div className="flex flex-row justify-between items-center z-[1000] ">
        <div className="hidden sm:hidden md:flex lg:flex" >
          <Navbar />
        </div>
        <div className="py-10 ">
          <Link href={"/"}>
            <EduEchoLogo />
          </Link>
        </div>
        <div className="hidden sm:hidden md:flex lg:flex">
          <ToggleButton />
        </div>
        <div className="flex sm:flex relative md:hidden lg:hidden w-8 h-8 z-[1000]">
          <div className="absolute top-0">
            <BurgerLines crossBurger={crossBurger} setCrossBurger={setCrossBurger} />
          </div>
          <div className='mt-4'>
            {<div className={`transition-all duration-300  ${crossBurger ? "-translate-x-[350px] flex" : "translate-x-[420px]  "}`}> <NavMenu /> </div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
