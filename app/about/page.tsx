"use client";

import { useState } from "react";
import { motion } from 'framer-motion';
import Header from "../components/header";
import Footer from "../components/footer/footer";
import SonAndFather from "../../public/mockups/sonAndFather";
import TeamWorkMockup from "../../public/mockups/teamWorkMockup";

const About = () => {
  const [expandCard1, setExpandCard1] = useState(false);
  const [expandCard2, setExpandCard2] = useState(false);

  return (
    <>
      <div className="">

        <div className="flex flex-col items-start justify-start">
          <motion.div
            initial={{ x: "60vw", opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ type: "tween", stiffness: 50, duration: 1 }}
            className="gap-x-10 mt-10 "
          >
            <div className="flex items-center flex-col md:flex-row ">
              <div className="w-full">
                <TeamWorkMockup width={400} height={400} className="w-full h-full" />
              </div>
              <p className={`px-4 py-3 transition-all duration-[2000ms] w-full ${expandCard1 ? "opacity-0 hidden" : "opacity-1"}`}>
                Monitor your child's attendance effortlessly with Your Edu Echo. As a parent, stay informed about your child's school attendance status. Log in, enter the verification code provided by the school, and access real-time updates on their attendance record. Stay actively involved in your child's education with ease and confidence. Join us now and stay connected effortlessly.
              </p>
            </div>
          </motion.div>
        </div>

        <div>
          <motion.div
            initial={{ x: '-50vw', opacity: 0 }}
            whileInView={{ x: "0vw", opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ type: "tween", stiffness: 50, duration: 1 }}
            className="gap-x-10 mt-10 m-auto overflow-hidden"
          >
            <div className="flex items-center flex-col-reverse md:flex-row ">
              <p className={`px-4 py-3 transition-all duration-[2000ms] w-full ${expandCard2 ? "opacity-0 hidden" : "opacity-1"}`}>
                Monitor your child's attendance effortlessly with Your Edu Echo. As a parent, stay informed about your child's school attendance status. Log in, enter the verification code provided by the school, and access real-time updates on their attendance record. Stay actively involved in your child's education with ease and confidence. Join us now and stay connected effortlessly.
              </p>
              <div className="w-full">
                <TeamWorkMockup width={400} height={400} className="w-full h-full" />
              </div>
            </div>
          </motion.div>
        </div>

        <div>
          <motion.div
            initial={{ x: '50vw', opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ type: "tween", stiffness: 50, duration: 1 }}
            className="gap-x-10 mt-10 m-auto overflow-hidden"
          >
            <div className="flex items-center flex-col md:flex-row ">
              <div className="w-full">
                <TeamWorkMockup width={400} height={400} className="w-full h-full" />
              </div>
              <p className={`px-4 py-3 transition-all duration-[2000ms] w-full ${expandCard2 ? "opacity-0 hidden" : "opacity-1"}`}>
                Monitor your child's attendance effortlessly with Your Edu Echo. As a parent, stay informed about your child's school attendance status. Log in, enter the verification code provided by the school, and access real-time updates on their attendance record. Stay actively involved in your child's education with ease and confidence. Join us now and stay connected effortlessly.
              </p>
            </div>
          </motion.div>
        </div>



        <Footer />
      </div>
    </>
  )
}

export default About;
