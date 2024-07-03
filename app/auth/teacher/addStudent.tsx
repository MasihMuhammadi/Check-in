"use client";
import React, { useState } from "react";
import MaleOrFemale from "../../components/maleOrFemale";
import Header from "../../components/header";
import TeacherInfo from "../../components/teacherInformationForm/teacherInfo";
import StudentInfo from "../../components/studentInfomationForm/studentInfo";
import Buttons from "../../components/buttons";
import axios from "axios";


const AddStudent = ({ data }: { data: any }) => {
    const [step, setStep] = useState(1)
    return <>

        <div className="mt-2">
            <div className={`flex flex-col h-[450px] justifiy-center items-center  overflow-x-hidden  transition-all duration-1000 `}>
                <div className={`transitin-all duration-1000 mt-5`}>
                    {<StudentInfo data={data} />}
                </div>
            </div>

        </div>
    </>;
};

export default AddStudent;
