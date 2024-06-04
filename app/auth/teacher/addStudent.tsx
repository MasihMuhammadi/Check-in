"use client";
import React, { useState } from "react";
import MaleOrFemale from "../../components/maleOrFemale";
import Header from "../../components/header";
import TeacherInfo from "../../components/teacherInformationForm/teacherInfo";
import StudentInfo from "../../components/studentInfomationForm/studentInfo";
import Buttons from "../../components/buttons";
import axios from "axios";


const AddStudent = () => {
    const [step, setStep] = useState(1)

    const addNewStudent = async () => {
        let baseUrl = "http://localhost:5000"
        axios.post(`${baseUrl}/api/students/add-student`, {

        })


        // if (step !== 2) {
        //     setStep(prevStep => prevStep + 1);
        // }
    };
    // const changeStepToBack = () => {
    //     if (step > 1) {
    //         setStep(prevStep => prevStep - 1)
    //     }
    // }
    // console.log(step, 'sssssssssss')
    return <>
        <Header />
        <div className="mt-2">
            <div className={`flex flex-col h-[450px] justifiy-center items-center  overflow-x-hidden  transition-all duration-1000 `}>
                {/* <div className={`transitin-all mt-5 duration-1000 ${step == 1 ? "" : "translate-y-[450px]"}`}>
                    {<MaleOrFemale />}
                </div> */}
                <div className={`transitin-all duration-1000 mt-5`}>
                    {<StudentInfo />}
                </div>
                {/* <div className={`transitin-all duration-1000 ${step == 3 ? "-translate-y-[500px]" : ""}`}>
                    <TeacherInfo />
                </div> */}
            </div>
            {/* <div className="text-center flex gap-x-2 mb-4 justify-center mt-5 items-center">
                <Buttons type="submit" clickHandler={addNewStudent} primary={step !== 3 ? true : false} disabled={step == 3 ? true : false}
                    style="px-10"
                >{step == 2 ? "Add Student" : "Next"}</Buttons>
                <Buttons secondary={step > 1 ? true : false} disabled={step <= 1 ? true : false}
                    style="px-10"
                >Back</Buttons>

            </div> */}
        </div>
    </>;
};

export default AddStudent;
