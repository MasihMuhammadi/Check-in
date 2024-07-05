"use client";
import { useEffect, useState } from "react";


const LandingPageText = () => {
  const [dynamicText, setDynamicText] = useState("Fastest");
  const [isVisible, setIsVisible] = useState(true);


  useEffect(() => {
    const timeout = setInterval(() => {
      setIsVisible(!isVisible);
    }, 6000);


  }, [isVisible]);


  return (
    <div className="leading mt-28 ">
      <p className="text-5xl leading-[60px] inline ">
        Unlock New  Experiences,

        <div className="  inline-flex pt-3 top-4 lef-2  flex-col justify-end items-center w-40 h-12  overflow-hidden relative">
          <span
            className={`  text-4xl duration-[3000ms] transition-all font-semibold left-0  ${isVisible
              ? "absolute top-0 -translate-y-0 delay-[1100ms]"
              : "translate-y-10 absolute top-1 "
              }`}
          >
            {" Secure  "}
          </span>
          <span
            className={` text-4xl duration-[3000ms] transition-all delay-[1100ms]  font-semibold left-0 ${isVisible
              ? "absolute -translate-y-10 top-1 "
              : "absolute  top-0 -translate-y-0 "
              }`}
          >
            Fastest
          </span>
        </div>


        One Check-In at a  Time

      </p>
    </div>
  );
};

export default LandingPageText;
