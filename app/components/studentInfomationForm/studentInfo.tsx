"use client";

import React, { useState } from 'react';
import TimePicker from 'react-time-picker';


const StudentInfo = () => {
    const [value, onChange] = useState<any>('10:00');
    return (
        <>
            <form className='flex flex-col justify-center items-center gap-y-4 gap-x-2'>
                <div className="flex flex-row gap-x-2">
                    <input type="text" className="border border-gray-500 h-14 w-96 rounded-lg px-2" placeholder="student full name" />
                    <input type="text" className="border border-gray-500 h-14 w-96 rounded-lg px-2" placeholder="course or school name" />
                </div>
                <div className="flex flex-row gap-x-2">
                    <input type="text" className="border border-gray-500 h-14 w-96 rounded-lg px-2" placeholder="student Father name" />
                    <input type="text" className="border border-gray-500 h-14 w-96 rounded-lg px-2" placeholder="student Father phone Number" />
                </div>
                <div className="flex flex-row gap-x-2">
                    <input type="text" className="border border-gray-500 h-14 w-96 rounded-lg px-2" placeholder="student Father Telegram Number" />
                    <input type="text" className="border border-gray-500 h-14 w-96 rounded-lg px-2" placeholder="student Father Email" />
                </div>
                <div className="flex flex-row gap-x-2">
                    <input type="text" className="border border-gray-500 h-14 w-96 rounded-lg px-2" placeholder="subject" />
                    <input type="text" className="border border-gray-500 h-14 w-96 rounded-lg px-2" placeholder="address" />
                </div>
                <div className="flex flex-row gap-x-2 relative">
                    <label className='absolute left-2 text-xs'>
                        from
                    </label>
                    <input type="time" className="border border-gray-500 h-14 w-96 rounded-lg px-2" placeholder="from" />
                    <label className='absolute right-2 text-xs'>
                        to
                    </label>
                    <input type="time" className="border border-gray-500 h-14 w-96 rounded-lg px-2" placeholder="to" />
                </div>
                {/* <TimePicker onChange={onChange} value={value} /> */}

            </form>
        </>
    );
};

export default StudentInfo;