import "./globals.css";
import LandingPage from "./components/landingPage";
import Information from "./components/information";
import Footer from "./components/footer/footer";

export default function Home() {
  return (
    <div className="lg:px-laptopScreen  md:px-IpadScreen sm:px-mobileScreen overflow-x-hidden">
      <LandingPage />
      <Information />
      <Footer />
    </div>
  );
}
