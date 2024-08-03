"use client";

import { useState } from "react";
import { motion } from 'framer-motion';
import Header from "../components/header";
import Footer from "../components/footer/footer";
import SonAndFather from "../../public/mockups/sonAndFather";
import TeamWorkMockup from "../../public/mockups/teamWorkMockup";
import AllTeacherMockup from "../../public/mockups/allTeachersMockup";
import GrowYourBussiness from "../../public/mockups/growYourBussiness";

const About = () => {
  const [expandCard1, setExpandCard1] = useState(false);
  const [expandCard2, setExpandCard2] = useState(false);

  return (
    <>
      <div className="w-full h-full">

        <div className="flex flex-col items-start justify-start">
          <motion.div
            initial={{ x: "60vw", opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ type: "tween", stiffness: 50, duration: 1 }}
            className="gap-x-10 mt-10 "
          >
            <div className="flex items-center  flex-col md:flex-row ">
              <div className="w-full">
                <TeamWorkMockup width={400} height={400} className="w-full h-full max-w-[400px]" />
              </div>
              {/* <h1 className="text-start text-xl font-semibold">Our Mission</h1> */}
              <p className={`px-4 py-3 transition-all duration-[2000ms] w-full ${expandCard1 ? "opacity-0 hidden" : "opacity-1"}`}>
                Our mission is to empower educational institutions with the tools they need to enhance their administrative efficiency, improve communication, and foster a better learning environment. We believe in the power of technology to transform education, and we are committed to making that transformation as seamless as possible for our clients.
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
              {/* <h1 className="text-start text-xl font-semibold">What we Offer</h1> */}

              <p className={`px-4 py-3 transition-all duration-[2000ms] w-full ${expandCard2 ? "opacity-0 hidden" : "opacity-1"}`}>
                Create, manage, and schedule courses with ease.
                Keep track of student information, attendance, and performance.
                Manage faculty schedules, assignments, and communication.
                Enhance communication between students, faculty, and administration.
                Reporting and Analytics: Generate detailed reports to track performance and identify areas for improvement.
              </p>
              <div className="w-full">
                <AllTeacherMockup width={400} height={400} className="w-full h-full max-w-[400px]" />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mb-40">
          <motion.div
            initial={{ x: '50vw', opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ type: "tween", stiffness: 50, duration: 1 }}
            className="gap-x-10 mt-10 m-auto overflow-hidden"
          >
            <div className="flex items-center flex-col md:flex-row ">
              <div className="w-full">
                <GrowYourBussiness width={400} height={400} className="w-full h-full max-w-[400px]" />
              </div>
              {/* <h1 className="text-start text-xl font-semibold">Grow your business</h1> */}

              <p className={`px-4 py-3 transition-all duration-[2000ms] w-full ${expandCard2 ? "opacity-0 hidden" : "opacity-1"}`}>

                Team Collaboration: Our system fosters teamwork by providing collaborative tools that enable faculty and students to work together more effectively, share resources, and communicate seamlessly, which ultimately contributes to the growth and success of your educational business.
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
