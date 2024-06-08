"use client";
import "./globals.css";
import LandingPage from "./components/landingPage";
import Information from "./components/information";
import Footer from "./components/footer/footer";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const isLoggedIn = useSelector((state: any) => state.courseSlice.isLoggedIn);
  const router = useRouter();
  useEffect(() => {
    const currentRoute = window.location.href.includes("teacher");
    console.log(currentRoute, 'cccccccc', isLoggedIn)

    if (!isLoggedIn && currentRoute) {
      router.push('/login');
    }
  }, [isLoggedIn]);
  return (
    <div className=" no-scrollbar overflow-hidden sm:px-mobileScreen md:tabletScreen lg:laptopScreen ">
      <LandingPage />
      <Information />
      <Footer />
    </div>
  );
}
