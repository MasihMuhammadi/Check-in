"use client";

import React, { useState } from 'react';
import TeacherMockup from '../../public/mockups/teacherMockup';
import ManagerMockup from '../../public/mockups/managerMockup';

const MaleOrFemale = ({ role, setRole }: { role: any, setRole: any }) => {
    const [selectedOption, setSelectedOption] = useState("");
    const [hoveredOption, setHoveredOption] = useState("");

    const handleChange = (e: any) => {
        setSelectedOption(e.target.value);
        setRole(e.target.value);
    };

    const handleMouseEnter = (option: any) => {
        setHoveredOption(option);
    };

    const handleMouseLeave = () => {
        setHoveredOption("");
    };

    return (
        <>
            <form action="">
                <div className="flex justify-center gap-x-5">
                    <label
                        htmlFor="teacher"
                        className={`relative inline-block h-full p-2 rounded-2xl border border-black transition-all duration-500 cursor-pointer mx-1 ${selectedOption === "teacher" ? "bg-black text-white" : "bg-white text-black"}`}
                        onMouseEnter={() => handleMouseEnter("teacher")}
                        onMouseLeave={handleMouseLeave}
                    >
                        <input
                            type="radio"
                            id="teacher"
                            value="teacher"
                            required
                            name="role"
                            className="hidden"
                            onChange={handleChange}
                        />
                        <div className="relative">
                            <TeacherMockup className="w-[100px] h-[100px] sm:w-[200px] sm:h-[200px]" />
                            {hoveredOption === "teacher" && (
                                <div className="absolute top-0 left-0 w-[100px] h-[100px] sm:w-[200px] sm:h-[200px] flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 hover:opacity-100 transition-opacity duration-300">
                                    <span className="text-lg font-bold">Teacher</span>
                                </div>
                            )}
                        </div>
                    </label>

                    <label
                        htmlFor="manager"
                        className={`relative inline-block p-2 rounded-2xl border border-black transition-all duration-500 cursor-pointer ${selectedOption === "manager" ? "bg-black text-white" : "bg-white text-black"}`}
                        onMouseEnter={() => handleMouseEnter("manager")}
                        onMouseLeave={handleMouseLeave}
                    >
                        <input
                            type="radio"
                            id="manager"
                            value="manager"
                            required
                            name="role"
                            className="hidden"
                            onChange={handleChange}
                        />
                        <div className="relative">
                            <ManagerMockup className="w-[100px] h-[100px] sm:w-[200px] sm:h-[200px]" />
                            {hoveredOption === "manager" && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 hover:opacity-100 transition-opacity duration-300">
                                    <span className="text-lg font-bold">Manager</span>
                                </div>
                            )}
                        </div>
                    </label>
                </div>
            </form>
        </>
    );
};

export default MaleOrFemale;
