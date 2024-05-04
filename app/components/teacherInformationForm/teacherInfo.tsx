"use client";

import React from 'react';

const TeacherInfo = () => {
    return (
        <>
            <form className='flex flex-col justify-center items-center gap-y-4 gap-x-2 mt-10'>
                <div className="flex flex-row gap-x-2">
                    <input type="text" className="border border-gray-500 h-14 w-96 rounded-lg px-2" placeholder="teacher name" />
                    <input type="text" className="border border-gray-500 h-14 w-96 rounded-lg px-2" placeholder="course or school name" />
                </div>
                <div className="flex flex-row gap-x-2">
                    <input type="text" className="border border-gray-500 h-14 w-96 rounded-lg px-2" placeholder="subject" />
                    <input type="text" className="border border-gray-500 h-14 w-96 rounded-lg px-2" placeholder="phone number" />
                </div>
            </form>
        </>
    );
};

export default TeacherInfo;