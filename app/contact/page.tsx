import ContactForms from "./components/contactForms";
import Header from "../components/header";
import SocialMediaShare from "./components/socialMediaShare";
import Footer from "../components/footer/footer";

const Contact = () => {
  return (
    <>
      <div className="">
        <Header />
        <div className="flex justify-between items-center flex-row">
          <div className="bg-gray-50 p-5 rounded ">
            <ContactForms />
          </div>
          {/* <div className="flex justify-end items-end float-end">
            <SocialMediaShare />
          </div> */}
        </div>
        <div className="pt-10"></div>
      </div>
      <Footer />
    </>
  );
};
export default Contact;
