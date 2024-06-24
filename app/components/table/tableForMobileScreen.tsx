"use client";
import { useState } from 'react';
import PopUp from '../popUp';
import PresentIcon from '../../../public/smallIcons/presentIcon';
import AbsentIcon from '../../../public/smallIcons/absentIcon';
import ThreeDotIcon from '../../../public/smallIcons/threeDotIcon';

const TableForMobileScreen = ({ isStudent, data, updatedClass, handleShowPopUp }: { isStudent: boolean, data?: any, updatedClass?: any, handleShowPopUp?: any }) => {
    const [showPopUp, setShowPopUp] = useState<boolean>(false);
    const handlePopUpMenu = () => {
        setShowPopUp(!showPopUp);
    };

    return (
        <>
            <div className='border border-primary flex flex-col my-5 text-center mx-10 rounded-xl shadow-md gap-y-5 py-6'>
                {showPopUp && <PopUp data={data} showEditModal={handleShowPopUp} setShowPopUp={setShowPopUp} />}
                <div className='flex flex-row justify-between px-10 items-center'>
                    <div>{isStudent ? <span className="font-semibold text-lg">Name</span> : ""}</div>
                    <div onClick={handlePopUpMenu} className='cursor-pointer'>
                        <ThreeDotIcon className="" />
                    </div>
                </div>
                <div className='flex flex-row justify-between px-10'>
                    <div className=''>
                        <p className="font-semibold">{isStudent ? "Name" : "Subject"}</p>
                        <p className="font-light">{isStudent ? "Masih" : data?.class_name}</p>
                    </div>
                    <div>
                        <p className="font-semibold">{isStudent ? "Father Name" : "Course"}</p>
                        <p className="font-light">{isStudent ? "Abdullah" : data?.course_name}</p>
                    </div>
                </div>
                <div className='flex flex-row justify-between px-10'>
                    <div className=''>
                        <p className="font-semibold">{isStudent ? "Phone" : "Time"}</p>
                        <p className="font-light">{isStudent ? data?.phone : `${data?.started_time} - ${data?.finish_time}`}</p>
                    </div>
                    <div>
                        <p className="font-semibold">{isStudent ? "Class" : ""}</p>
                        <p className="font-light">{isStudent ? data?.class_name : ""}</p>
                    </div>
                </div>
                <div className='flex flex-row justify-between px-10'>
                    <div className=''>
                        <p className="font-semibold">{isStudent ? "Absent Days" : "Days"}</p>
                        <p className="font-light">{isStudent ? "5" : ` ${data?.start_day} - ${data?.finish_day}`}</p>
                    </div>
                    <div>
                        <p className="font-semibold">{isStudent ? "Present Days" : "Student Count"}</p>
                        <p className="font-light">{isStudent ? "25" : "50"}</p>
                    </div>
                </div>
                {isStudent && (
                    <div className='flex flex-row justify-between px-10'>
                        <div className='' >
                            <p className="font-semibold"><PresentIcon /></p>
                        </div>
                        <div>
                            <p className="font-light"><AbsentIcon /></p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default TableForMobileScreen;
