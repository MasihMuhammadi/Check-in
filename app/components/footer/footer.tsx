import React from "react";

const Footer = () => {
  return (
    <>
      <div className="flex  bg-gray-50 mt-5">
        <div className=" w-full h-auto z-[1000]">
          <div className="w-full h-full pt-10 bg-gradientPrimary  flex flex-col sm:flex-row justify-between  sm:px-10 ">
            <div className="mx-5 ">
              <h1 className="text-white text-3xl underline ">Pages</h1>
              <ul className="text-white">
                <li className="mt-2">Home</li>
                <li className="mt-2">About</li>
                <li className="mt-2">Services</li>
                <li className="mt-2">Contact</li>
                <li className="mt-2">SignUp</li>
                <li className="mt-2">Login</li>
              </ul>
            </div>

            <div className="mx-5 pt-14">
              <h1 className="text-white text-3xl underline ">Developers</h1>
              <ul className="text-white">
                <li className="mt-2">Masihullah Muhmmadi</li>
                <li className="mt-2">Ansarullah Quraishi</li>
              </ul>
            </div>

            <div className="mx-5  pt-28">
              <h1 className="text-white text-3xl underline ">Contact Us</h1>
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
          </div>
        </div>
        {/* <div className="shaped-div2 w-[300px] h-[400px] bg-red-400 mt-36"></div> */}
      </div>
    </>
  );
};

export default Footer;
