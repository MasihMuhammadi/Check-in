import ManAndLoudSpeaker from "@/public/mockups/manAndLoudSpeaker";
import LandingPageText from "./landingPageText";
import Buttons from "./buttons";

const MainPage = () => {
  return (
    <>
      <div className="flex flex-col justify-between md:flex-row overflow-hidden">
        <div className="flex flex-col">
          <LandingPageText />
          <div className="flex justify-center mx-2 px">

          </div>
        </div>
        <div className="flex lg:flex mt-3">
          <ManAndLoudSpeaker className="w-[600px] md:w-[600px] lg:w-[800px]" />
        </div>
      </div>
      <div className=" flex flex-col md:flex-row md:w-2/5">
        <Buttons primary={true} style={"py-3 mx-2 mt-2 px-5"}>
          Get Started
        </Buttons>
        <Buttons secondary={true} style="py-2 mx-2 mt-2 px-5">How It Work</Buttons>
      </div>
    </>
  );
};

export default MainPage;
