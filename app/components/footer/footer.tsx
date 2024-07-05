import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <>
      <div className="flex  bg-gray-50 mb-5 ">
        <div className=" w-full h-auto z-[1000]">
          <div className="w-full h-full pt-10 bg-gradientPrimary pb-4 flex flex-col sm:flex-row justify-between  sm:px-10 ">
            <div className="mx-5 ">
              <h1 className="text-white text-3xl underline ">Pages</h1>
              <ul className="text-white">
                <li className="mt-2">
                  <Link href="/" className="mt-2">Home</Link>

                </li>
                <li className="mt-2">
                  <Link href="/about" className="mt-2">About</Link>

                </li>
                <li className="mt-2">
                  <Link href="/contact" className="mt-2">Contact</Link>
                </li>

                <li className="mt-2">
                  <Link href="/courses" className="mt-2">Courses</Link>
                </li>
              </ul>
            </div>

            <div className="mx-5 pt-14">
              <h1 className="text-white text-3xl underline ">Developers</h1>
              <ul className="text-white">
                <li className="mt-2">Masihullah Muhmmadi</li>
                <li className="mt-2">Ansarullah Quraishi</li>
              </ul>
            </div>

            <div className="mx-5  pt-28 pb-6">
              <h1 className="text-white text-3xl underline pb-2 mb-3">Contact Us</h1>
              <ul className="text-white">
                <li className="mt-2 text-[14px]">Email: masihmuhammadi202@gmail.com</li>
                <li className="mt-2 text-[14px]">Phone: +93749102015</li>
                <li className="mt-2 text-[14px]">Facebook: Masihullah Muhammadi</li>
                <li className="mt-2 text-[14px]">Instagram: im.masih_muhammadi</li>

                <li className="mt-2 text-[14px]">
                  Github: <a href="https://www.github.com/MasihMuhammadi">Github</a>
                </li>
              </ul>
            </div>
            <p className="text-white text-center opacity-50 text-sm">Copyright © CIN (Check In Now). All rights reserved.</p>
          </div>
        </div>
        {/* <div className="shaped-div2 w-[300px] h-[400px] bg-red-400 mt-36"></div> */}
      </div>
    </>
  );
};

export default Footer;
