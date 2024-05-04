"use client";
import React, { useState } from "react";
import MaleOrFemale from "@/app/components/maleOrFemale";
import Header from "@/app/components/header";
import Buttons from "@/app/components/buttons";
import TeacherInfo from "@/app/components/teacherInformationForm/teacherInfo";
import StudentInfo from "@/app/components/studentInfomationForm/studentInfo";

const AddStudent = () => {
    const [step, setStep] = useState(1)
    const changeStep = () => {
        if (step !== 3) {

            setStep(prevStep => prevStep + 1);
        }
    };
    const changeStepToBack = () => {
        if (step > 1) {
            setStep(prevStep => prevStep - 1)
        }
    }
    return <>
        <div className="mt-2">
            <Header />
            <div className={`flex flex-col h-[450px] justifiy-center items-center overflow-y-hidden   transition-all duration-1000 `}>
                <div className={`transitin-all mt-5 duration-1000 ${step == 1 ? "" : "translate-y-[450px]"}`}>
                    {<MaleOrFemale />}
                </div>
                <div className={`transitin-all duration-1000 ${step == 2 ? "-translate-y-[300px]" : "translate-y-[80px]"}`}>
                    <TeacherInfo />
                </div>5
                <div className={`transitin-all duration-1000 ${step == 3 ? "-translate-y-[500px]" : ""}`}>
                    {<StudentInfo />}
                </div>

            </div>
            <div className="text-center flex justify-center mt-5 items-center">
                <Buttons clickHandler={changeStep} primary={step !== 3 ? true : false} disabled={step == 3 ? true : false}
                    style="px-10"
                >Next</Buttons>
                <Buttons clickHandler={changeStepToBack} secondary={step > 1 ? true : false} disabled={step <= 1 ? true : false}
                    style="px-10"
                >Back</Buttons>

            </div>
        </div>
    </>;
};

export default AddStudent;
