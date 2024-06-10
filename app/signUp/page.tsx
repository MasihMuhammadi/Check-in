"use client";

import Header from "../components/header";
// import SignUpFormInputes from "./components/signUpFormInputes";
import Footer from "../components/footer/footer";
import SignUpMockup from '../../public/mockups/signUpMockup';
import ManagerSignUpFormInputes from "./components/managerSignUpFormInputes";
import TeacherSignUpFormInputes from "./components/teacherSignUpFormInputes";
import TeacherMockup from '../../public/mockups/teacherMockup'
import MaleOrFemale from "../components/maleOrFemale";
import { useState } from "react";

const SignUp = () => {
  const [role, setRole] = useState()

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
            <div className="flex justify-center items-center gap-x-4 mb-5 rounded-[20px]">
              {/* <div className="bg-black ">
                <TeacherMockup width={100} height={200} />
              </div>
              <div className="bg-black ">
                <TeacherMockup width={100} height={200} />
              </div> */}
              <MaleOrFemale role={role} setRole={setRole} />
            </div>
            {role == "manager" ?

              <ManagerSignUpFormInputes role={role} />
              :
              <TeacherSignUpFormInputes role={role} />
            }
          </div>

        </div>
        <div className="pt-24"></div>
      </div>
      <Footer />
    </>
  );
};

export default SignUp;
