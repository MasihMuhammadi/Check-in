
import LandingPage from "./components/landingPage";
import Information from "./components/information";
import Footer from "./components/footer/footer";
import Cookies from "js-cookie";
import { cookies } from "next/headers";

export default function Home() {

  return (
    <div className="no-scrollbar overflow-hidden sm:px-mobileScreen md:tabletScreen lg:laptopScreen">
      <LandingPage />
      <Information />
      <Footer />
    </div>
  );
}
