"use client";
import ManAndLoudSpeaker from "@/public/mockups/manAndLoudSpeaker";
// import AOS from "aos";
import "aos/dist/aos.css";
// import Image from "next/image";
import Masih from "../../public/images/Masih.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHistory, faPeopleArrowsLeftRight, faRocket } from '@fortawesome/free-solid-svg-icons'

import { useEffect } from "react";
import Buttons from "./buttons";
import SonAndFather from "@/public/mockups/sonAndFather";
import RealTimeUpdate from "@/public/smallIcons/realtimeUpdate";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
// import MasihImage from "../../public/images/Masih.jpg"
import Image from 'next/image';
import masihImage from "../../public/images/Masih.jpg"
import Link from "next/link";
import { useRouter } from "next/navigation";

const Information = () => {
  const courseId = "course_123abc"

  return (
    <div>
      <div className=" grid grid-cols-1 sm:gap-x-1 sm:grid-cols-2 md:grid-cols-3  md:gap-x-2 lg:grid-cols-4 items-center content-center justify-center gap-4  ">
        {/* Display three cards in a row */}
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className=" flex justify-center items-center">
            <div key={index} className="border border-black w-64 h-80 rounded-xl text-blue-500">
              <div className="px-2">
                <Skeleton borderRadius={10} width={240} baseColor="#0B3353" height={50} duration={2.5} />
              </div>
              <div className="flex items-center justify-center">
                <Image src={masihImage} width={150} height={60} className="text-center content-center " alt="" />
              </div>
              <div className="px-4">
                <Skeleton count={2} borderRadius={4} />
                {/* <Skeleton width={100} height={30} borderRadius={4} style={{ textAlign: "center", content: "center" }} /> */}
                <Buttons secondary={true} style="px-5  text-black">
                  <Link href={`/courses/${courseId}`} >
                    {/* <button>View Course</button> */}
                    view course
                  </Link>
                </Buttons>
              </div>
            </div>
          </div>

        ))}
        <Link href="/courses">
          <Buttons primary={true} style="px-10">See More</Buttons>
        </Link>
      </div>

      <h1 className="text-2xl mt-10 font-bold mx-4">Why Should We Use Edu Echo?</h1>
      <div className="flex flex-col sm:flex-row justify-center items-center">
        <div>
          <SonAndFather className={"w-[400px] md:w-[400px] lg:w-[500px]"} />
        </div>
        <div className="flex flex-col mx-4">
          <p className="mb-6">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut libero et hic numquam sed aut veritatis minima, dignissimos tenetur molestias, laboriosam alias nostrum officiis fuga nobis repellendus maxime qui ipsum. Consequuntur aut porro asperiores nemo? Vitae repudiandae voluptatem aliquam quis?</p>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut libero et hic numquam sed aut veritatis minima, dignissimos tenetur molestias, laboriosam alias nostrum officiis fuga nobis repellendus maxime qui ipsum. Consequuntur aut porro asperiores nemo? Vitae repudiandae voluptatem aliquam quis?</p>
        </div>
      </div>
    </div>
  );
};

export default Information;


