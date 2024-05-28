
import LandingPageText from "./landingPageText";
import Buttons from "./buttons";
import Link from "next/link";
import ManAndLoudSpeaker from "../../public/mockups/manAndLoudSpeaker";

const MainPage = () => {

  return (
    <>
      <div className="flex flex-col justify-between md:flex-row overflow-hidden  ">
        <div className=" ">
          <LandingPageText />
          <div className=" hidden md:flex sm:flex-col md:flex-row mt-5 ">
            <Buttons primary={true} style={"py-3 mx-2 mt-2 px-4"}>
              Get Started
            </Buttons>
            <Buttons secondary={true} style="py-2 mx-2 mt-2 px-5"> <Link href="/about"> How It Work</Link></Buttons>
          </div>
        </div>
        <div className="flex lg:flex mt-3">
          <ManAndLoudSpeaker className="w-[600px] md:w-[600px] lg:w-[800px]" />
        </div>
      </div>
      <div className=" flex md:hidden flex-col  mt-5 ">
        <Buttons primary={true} style={"py-3 mx-2 mt-2 px-5"}>
          Get Started
        </Buttons>
        <Buttons secondary={true} style="py-2 mx-2 mt-2 px-5">How It Work</Buttons>
      </div>
    </>
  );
};

export default MainPage;
