import LoginMockup from "@/public/mockups/loginMockup";
import Header from "../components/header";
import SignUpFormInputes from "./components/signUpFormInputes";
import Footer from "../components/footer/footer";

const Login = () => {
  return (
    <>
      <div className="">
        <Header />
        <div className="flex flex-row justify-center items-center mt-10">
          <LoginMockup />
          <div className="border border-black w-[1px] h-[450px] mx-10"></div>
          {/* <div className=" flex items-center h-[0px] w-2/5"> */}
          <SignUpFormInputes />
          {/* </div> */}
        </div>
        <div className="pt-24"></div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
