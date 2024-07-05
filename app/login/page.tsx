"use client";
import React, { useEffect, useState } from "react";
import ManagerLoginForm from "../components/managerLoginForm";
import TeacherLoginForm from '../components/teacherLoginForm'
import MaleOrFemale from "../components/maleOrFemale";
import LoginMockup from "../../public/mockups/loginMockup";



const Login = () => {
  const [role, setRole] = useState('')
  return (
    <>
      <div className="px-10">
        <div className="flex gap-x-4 justify-between items-center ">
          <div className='hidden md:block bg-primary w-full max-w-[580px]'>
            <LoginMockup className="h-full rounded-xl  border border-white m-10" />
          </div>
          <div className="w-full">
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
