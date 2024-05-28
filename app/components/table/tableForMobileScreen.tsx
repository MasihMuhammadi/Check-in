
import React from 'react';
import AbsentIcon from '../../../public/smallIcons/absentIcon';
import PresentIcon from '../../../public/smallIcons/presentIcon';
import ThreeDotIcon from '../../../public/smallIcons/threeDotIcon';

const TableForMobileScreen = ({ isStudent }: { isStudent: boolean }) => {
    return (
        <>
            <div className='border border-primary flex flex-col  text-center mx-10 rounded-xl shadow-md gap-y-5 py-6 '>
                <div className='flex flex-row justify-between px-10 items-center'>
                    <div>{isStudent ? <span className="font-semibold text-lg">StudentID</span> : ""}</div>
                    <ThreeDotIcon className="" />
                </div>
                <div className='flex flex-row justify-between px-10'>
                    <div className=''>
                        <p className="font-semibold">{isStudent ? "Name" : "Subject"}</p>
                        <p className="font-light">{isStudent ? "Masih" : "Math"}</p>
                    </div >
                    <div>
                        <p className="font-semibold">{isStudent ? "Father Name" : "Course"}</p>
                        <p className="font-light">{isStudent ? "Abdullah" : "Mozamel"}</p>
                    </div>
                </div >
                <div className='flex flex-row justify-between px-10'>
                    <div className=''>
                        <p className="font-semibold">{isStudent ? "Phone" : "Start Time"}</p>
                        <p className="font-light">{isStudent ? "+9381281928" : "12:00 PM"}</p>
                    </div>
                    <div>
                        <p className="font-semibold">{isStudent ? "End Time" : "Class"}</p>
                        <p className="font-light">{isStudent ? "1:00 PM" : "Math"}</p>
                    </div>
                </div>
                <div className='flex flex-row justify-between px-10'>
                    <div className=''>
                        <p className="font-semibold">{isStudent ? "Absent Days" : "Days"}</p>
                        <p className="font-light">{isStudent ? "5" : "sat-thu"}</p>
                    </div>
                    <div>
                        <p className="font-semibold">{isStudent ? "present Days" : "Student Count"}</p>
                        <p className="font-light">{isStudent ? "25" : "50"}</p>
                    </div>
                </div>
                {
                    isStudent && <div className='flex flex-row justify-between px-10'>
                        <div className=''>
                            <p className="font-semibold"><PresentIcon /></p>
                        </div>
                        <div>
                            <p className="font-light"><AbsentIcon /></p>
                        </div>

                    </div>
                }
            </div >
        </>
    );
};

export default TableForMobileScreen; 