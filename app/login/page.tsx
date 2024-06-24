"use client";

import React, { useEffect, useState } from "react";

// import LoginForm from "../components/managerLoginForm";
import Header from "../components/header";
import ManagerLoginForm from "../components/managerLoginForm";
import TeacherLoginForm from '../components/teacherLoginForm'
// ManagerLoginForm
import MaleOrFemale from "../components/maleOrFemale";
import LoginMockup from "../../public/mockups/loginMockup";



const Login = () => {
  const [role, setRole] = useState('')
  return (
    <>
      <div className="">
        <div className="flex gap-x-4 justify-between items-center ">
          <div className='w-full  bg-primary '>
            <LoginMockup className="w-[500px] h-[500px ] rounded-xl  border border-white m-10" />
          </div>
          <div>
            <MaleOrFemale role={role} setRole={setRole} />
            <div>
              {role == 'manager' ?
                <ManagerLoginForm role={role} setRole={setRole} />
                :
                <TeacherLoginForm role={role} setRole={setRole} />
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
