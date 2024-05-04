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
      <div className="flex flex-row gap-x-10 justify-center mt-10 m-auto">
        <div className={`card bg-gray-300 rounded-md justifiy-between transition-all duration-400  relative pb-8 ${expandCard1 ? " w-80 h-auto " : "w-80 h-96"}`}>
          <div className="flex flex-col justify-center items-center ">
            <SonAndFather className={"w-[347px] h-[291px]"} />
            <Buttons secondary={true} style="w-64" >Check you child status</Buttons>
            <p className={`px-4 py-3 transition-all duration-400 ${expandCard1 ? "opacity-1" : "opacity-0 "}`}>Monitor your child's attendance effortlessly with [Your Website Name]. As a parent, stay informed about your child's school attendance status. Log in, enter the verification code provided by the school, and access real-time updates on their attendance record. Stay actively involved in your child's education with ease and confidence. Join us now and stay connected effortlessly.</p>
            <div className="h-10 w-10 rounded-full bg-primary text-center text-white absolute bottom-0 left-3 flex items-center justify-center cursor-pointer" onClick={() => setExpandCard1(!expandCard1)}>
              <ArrowIcon />

            </div>
          </div>
        </div>
        <div className={`card bg-gray-300 rounded-md justifiy-between transition-all duration-1000  relative pb-8 ${expandCard2 ? " w-80 h-auto " : "w-80 h-96"}`}>
          <div className="flex flex-col justify-center items-center ">
            <TeacherAndStudent className="w-[347px] h-[291px] " />
            <Buttons secondary={true} style="w-64" >Create your class</Buttons>
            <p className={`px-4 py-3 transition-all duration-400 ${expandCard2 ? "opacity-1" : "opacity-0 "}`}>At [Your Website Name], teachers can effortlessly create and manage their classes, adding students and taking attendance. Each day, when teachers check in their students, a notification is automatically sent to the parents. By logging in as a teacher, you have the ability to create and manage your classes, as well as send notifications to parents. Use this tool to enhance communication with parents and improve their involvement in the educational process.</p>
            <div className="h-10 w-10 rounded-full bg-primary text-center text-white absolute bottom-0 left-3 flex items-center justify-center cursor-pointer" onClick={() => setExpandCard2(!expandCard2)}>
              <ArrowIcon />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
export default About;
