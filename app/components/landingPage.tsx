"use client";
import Header from "./header";
import Information from "./information";
import MainPage from "./mainPage";
const LandingPage = () => {
  return (
    <>
      <div className=" overflow-hidden mb-10 no-scrollbar px-mobileScreen ">
        <Header />
        <MainPage />
      </div>
    </>
  );
};
export default LandingPage;
