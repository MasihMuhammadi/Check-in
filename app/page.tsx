
"use client"
import LandingPage from "./components/landingPage";
import Information from "./components/information";
import Footer from "./components/footer/footer";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

export default function Home() {
  // const isLogedIn = useSelector((state: any) => state.authSlice.isLoggedIn)
  // console.log(Cookies.get("user_access"))
  // console.log(isLogedIn, 'lllllllllllllllloginnnnnnnnnnnnnnnn')
  return (
    <div className="no-scrollbar overflow-hidden sm:px-mobileScreen md:tabletScreen lg:laptopScreen">
      <LandingPage />
      <Information />
      <Footer />
    </div>
  );
}
