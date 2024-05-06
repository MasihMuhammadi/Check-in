"use client";

import SonAndFather from "@/public/mockups/sonAndFather";
import Buttons from "../components/buttons";
import { useState } from "react";
import TeacherAndStudent from "@/public/mockups/teacherAndStudent";
import Header from "../components/header";
import ArrowIcon from "@/public/smallIcons/arrowIcon";
import Footer from "../components/footer/footer";


const About = () => {
  const [expandCard1, setExpandCard1] = useState(false)
  const [expandCard2, setExpandCard2] = useState(false)
  return (

    <>
      <Header />

      <div className="flex flex-col items-start justify-start bg-blue-500 w-full">

        <div className="  gap-x-10  mt-10 m-auto ">
          <div className={`card bg-gray-300 rounded-md  transition-all duration-2000 relative pb-8 ${expandCard1 ? "w-full h-96 duration-3000" : "w-full duration-4000 h-96"}`}>
            <div className="flex flex-row justify-start items-center duration-[4000ms]">
              <SonAndFather width={400} height={400} className="" />
              {/* <Buttons secondary={true} style="w-full h-auto" >Check you child status</Buttons> */}
              <p className={`px-4 py-3 transition-all duration-[2000ms] w-full ${expandCard1 ? "opacity-0 hidden " : "opacity-1 "}`}>
                Monitor your childs attendance effortlessly with Your Edu Echo. As a parent, stay informed about your childs school attendance status. Log in, enter the verification code provided by the school, and access real-time updates on their attendance record. Stay actively involved in your childs education with ease and confidence. Join us now and stay connected effortlessly.</p>
              <div className="px-5 py-3 m-2 rounded-full bg-primary text-center text-white absolute right-0 bottom-0 flex items-center justify-center cursor-pointer" onClick={() => setExpandCard1(!expandCard1)}>
                <div>

                  {/* <ArrowIcon /> */}
                  Learn More
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className=" gap-x-10  mt-10 m-auto ">
          <div className={`card bg-gray-300 rounded-md  transition-all duration-2000 relative pb-8 ${expandCard2 ? "w-full h-96 duration-3000" : "w-full duration-4000 h-96"}`}>
            <div className="flex flex-row justify-start items-center duration-[4000ms]">
              <SonAndFather width={400} height={400} className="" />
              {/* <Buttons secondary={true} style="w-full h-auto" >Check you child status</Buttons> */}
              <p className={`px-4 py-3 transition-all duration-[2000ms] w-full ${expandCard2 ? "opacity-0 hidden " : "opacity-1 "}`}>
                Monitor your childs attendance effortlessly with Your Edu Echo. As a parent, stay informed about your childs school attendance status. Log in, enter the verification code provided by the school, and access real-time updates on their attendance record. Stay actively involved in your childs education with ease and confidence. Join us now and stay connected effortlessly.</p>
              <div className="px-5 py-3 m-2 rounded-full bg-primary text-center text-white absolute right-0 bottom-0 flex items-center justify-center cursor-pointer" onClick={() => setExpandCard2(!expandCard2)}>
                <div>

                  {/* <ArrowIcon /> */}
                  Learn More
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
export default About;
