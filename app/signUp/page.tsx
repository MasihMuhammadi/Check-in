import SignUpMuckup from '../../public/mockups/signUpMockup'
import Header from "../components/header";
import SignUpFormInputes from "./components/signUpFormInputes";
import Footer from "../components/footer/footer";
import SignUpMockup from '../../public/mockups/signUpMockup';

const Login = () => {
  return (
    <>
      <div className="">
        <Header />
        <div className="flex flex-row justify-center items-center mt-10 ">
          <div className='hidden md:block w-full'>
            <SignUpMockup className={"w-[460px] h-[460px] md:w-[400px] md:h-[400px]"} />
          </div>
          <div className="border border-black w-[1px] h-[480px] mx-2 hidden md:block"></div>
          <div className='w-full'>
            <SignUpFormInputes />
          </div>

        </div>
        <div className="pt-24"></div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
