"use client";
import ManAndLoudSpeaker from "@/public/mockups/manAndLoudSpeaker";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import Masih from "../../public/images/Masih.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHistory, faPeopleArrowsLeftRight, faRocket } from '@fortawesome/free-solid-svg-icons'

import { useEffect } from "react";
import Buttons from "./buttons";
import SonAndFather from "@/public/mockups/sonAndFather";
import RealTimeUpdate from "@/public/smallIcons/realtimeUpdate";

const Information = () => {
  const alphabet: string[] = [];
  const wordsWithR: any[] = [];
  for (let i = 97; i <= 122; i++) {
    alphabet.push(String.fromCharCode(i));
  }

  const generateWords = (): string[] => {
    const words: string[] = [];
    for (const firstLetter of alphabet) {
      for (const secondLetter of alphabet) {
        for (const thirdLetter of alphabet) {
          for (const fourthletter of alphabet) {
            for (const fifthletter of alphabet) {

              const word = `c${firstLetter}${secondLetter}${thirdLetter}${fourthletter}${fifthletter}to`;

              words.push(word);
            }
          }

        }
      }
    }
    return words;
  };

  let generatedWords = generateWords();
  let allwords: any = [...generatedWords]

  // console.clear()
  generatedWords.map(w => w.includes('r') ? wordsWithR.push(w) : "")
  console.log(wordsWithR, '00000000 ')
  // if (ge.includes("r")) {
  // console.log(generatedWords, '+++')
  // }



  const delays = [0, 200, 400]; // Define delay values for each div

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-between overflow-hidden mt-20 ">
        <div
          className="w-full relative max-w-80 sm:max-w-96 transition-all duration-100 mx-2 mt-3 h-[270px] bg-white shadow-xl border border-primary rounded-xl  text-black  flex flex-col items-center justify-center "
          data-aos="fade-right"
          data-aos-anchor-placement="top-center"
          data-aos-delay={delays[1]} // Apply delay for the second div
        >
          <div className="absolute top-3 left-2">
            <FontAwesomeIcon icon={faRocket} size="2x" fade />
          </div>
          <div className="flex justify-center items-center">
            <div className=" text-primary px-4 mt-4">
              <p>
                Register today and start receiving updates straight to your inbox. It’s as simple as 1-2-3!
              </p>
            </div>
          </div>


        </div>
        <div
          className="w-full max-w-80 relative sm:max-w-96 transition-all duration-100 mx-2 mt-3 h-[270px] bg-white shadow-xl border border-primary rounded-xl  text-black  flex flex-col items-center justify-center "
          data-aos="fade-up"
          data-aos-anchor-placement="top-center"
          data-aos-delay={delays[1]} // Apply delay for the second div
        >
          <div className="absolute left-2 top-3">
            <FontAwesomeIcon icon={faPeopleArrowsLeftRight} size="2x" shake />
          </div>
          <div className="flex justify-center items-center">
            <div className=" text-primary px-4 mt-4">
              <p>
                Strengthen the communication between parents and school. Stay updated about your child’s academic activities.
              </p>
            </div>
          </div>

        </div>
        <div
          className="w-full relative max-w-80 sm:max-w-96 transition-all duration-100 mx-2 mt-3 h-[270px] bg-white shadow-xl border border-primary rounded-xl  text-black  flex flex-col items-center justify-center "
          data-aos="fade-left"
          data-aos-anchor-placement="top-center"
          data-aos-delay={delays[1]} // Apply delay for the second div
        >
          <div className="absolute left-2 top-3">
            <FontAwesomeIcon icon={faHistory} spin={true} size="2x" />
          </div>
          <div className="flex  justify-center items-center">

            <div className=" text-primary px-4 mt-4">
              <p>
                Get instant notifications about your child’s school attendance. Know immediately when your child checks in at school.
              </p>
            </div>
          </div>

        </div>
      </div>
      <h1 className="text-2xl mt-10 font-bold mx-4">Why Should We Use Edu Echo?</h1>
      <div className="">

        <div className="flex flex-col md:flex-row justify-center items-center">
          <div className="">

            <SonAndFather className={"w-[400px] md:w-[400px] lg:w-[500px]"} />
          </div>
          <div className="">
            <div className="flex flex-col mx-4">
              <p className="mb-6">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut libero et hic numquam sed aut veritatis minima, dignissimos tenetur molestias, laboriosam alias nostrum officiis fuga nobis repellendus maxime qui ipsum. Consequuntur aut porro asperiores nemo? Vitae repudiandae voluptatem aliquam quis?</p>

              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut libero et hic numquam sed aut veritatis minima, dignissimos tenetur molestias, laboriosam alias nostrum officiis fuga nobis repellendus maxime qui ipsum. Consequuntur aut porro asperiores nemo? Vitae repudiandae voluptatem aliquam quis?</p>
            </div>
          </div>
        </div>
      </div>



    </div>
  );
};

export default Information;
