"use client";

import React, { useState } from 'react';
import Male from '../../public/mockups/male';
import Female from '../../public/mockups/female';

const MaleOrFemale = () => {
    const [selectedOption, setSelectedOption] = useState<string>("")
    return (
        <>
            <form action="">
                <div className='flex justify-center gap-x-5'>
                    <label htmlFor="male" className={`inline p-2 rounded-2xl border border-black transition-all duration-500 cursor-pointer mx-1 ${selectedOption == "male" ? "bg-black text-white" : "bg-white text-black"}`} >
                        <input type="radio"
                            id="male"
                            value={"male"}
                            required
                            name="gen"
                            className='hidden'
                            onChange={(e) => setSelectedOption(e.target.value)}
                        />
                        <Male />
                    </label>
                    <label htmlFor="female" className={` p-2 rounded-2xl border border-black transition-all duration-500  cursor-pointer  ${selectedOption == "female" ? "bg-black text-white" : "bg-white text-black"}`}>
                        <input type="radio"
                            id="female"
                            className='hidden'
                            required

                            value={"female"}
                            name="gen"
                            onChange={(e) => setSelectedOption(e.target.value)}
                        />
                        <Female />
                    </label>
                </div>
            </form>
        </>
    );
};

export default MaleOrFemale;