"use client";
import Header from "./header";
import Information from "./information";
import MainPage from "./mainPage";
const LandingPage = () => {
  return (
    <>
      <div className=" overflow-hidden mb-10 no-scrollbar ">
        <Header />
        <MainPage />
      </div>
    </>
  );
};
export default LandingPage;
