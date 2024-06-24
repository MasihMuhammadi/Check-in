"use client";

import React, { useState } from 'react';
import Male from '../../public/mockups/male';
import Female from '../../public/mockups/female';
import TeacherMockup from '../../public/mockups/teacherMockup';
import ManagerMockup from '../../public/mockups/managerMockup';

const MaleOrFemale = ({ role, setRole }: { role: any, setRole: any }) => {
    const [selectedOption, setSelectedOption] = useState<string>("")
    const handleChange = (e: any) => {
        setSelectedOption(e.target.value)
        setRole(e.target.value)
    }
    return (
        <>
            <form action="">
                <div className='flex justify-center gap-x-5'>
                    <label htmlFor="teacher" className={`inline h-full p-2 rounded-2xl border border-black transition-all duration-500 cursor-pointer mx-1 ${selectedOption === "teacher" ? "bg-black text-white" : "bg-white text-black"}`} >
                        <input type="radio"
                            id="teacher"
                            value={"teacher"}
                            required
                            name="role"
                            className='hidden'
                            onChange={(e) => handleChange(e)}
                        />
                        <TeacherMockup className={'w-[100px] h-[100px] sm:w-[200px] sm:h-[200px]'} />
                    </label>
                    <label htmlFor="manager" className={`inline p-2 rounded-2xl border border-black transition-all duration-500  cursor-pointer  ${selectedOption === "manager" ? "bg-black text-white" : "bg-white text-black"}`}>
                        <input type="radio"
                            id="manager"
                            className='hidden'
                            required
                            value={"manager"}
                            name="role"
                            onChange={(e) => handleChange(e)}
                        />
                        <ManagerMockup className={'w-[100px] h-[100px] sm:w-[200px] sm:h-[200px]'} />
                    </label>
                </div>
            </form>
        </>
    );
};

export default MaleOrFemale;
