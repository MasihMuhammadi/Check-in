
"use client";
import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch, faCopy } from '@fortawesome/free-solid-svg-icons'
import Tooltip from './tooltip';
import AlertTip from './alertTip';
import Spinner from './spinner';


const ManagerDashboard = (
    {
        data,
        isLoading,
        // isCopy,
        // copyCode
    }:
        {
            data: any,
            isLoading: boolean,
            // isCopy: boolean,
            // copyCode?: any
        }) => {

    const [isCopy, setIsCopy] = useState<any>(false);
    const textRef = useRef<any>()
    // console.log(data, 'AAAAAAAAAAAAAAAllllllllllllllllll')

    const copyCode = () => {
        if (textRef.current) {
            const textToCopy = textRef.current.innerText;
            console.log('Text to copy:', textToCopy); // Check if the correct text is logged

            navigator.clipboard.writeText(textToCopy).then(() => {
                setIsCopy(true);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        }
    };

    return (

        <>
            <div className='sm:px-mobileScreen md:tabletScreen lg:laptopScreen '>
                <div className='mb-5 flex justify-between items-center'>
                    <div>
                        {isLoading ?
                            <Skeleton borderRadius={10} baseColor="#ccc" width={300} height={40} duration={2.5} /> :
                            <h1 className='text-2xl'>Welcome to <b className='capitalize'>{data?.currentCourse?.courseName}</b> Course</h1>
                        }
                    </div>
                    <div>
                        {isLoading ? (
                            // <div className=" border-radius-10 rounded-md bg-gray-300 w-72 h-10 duration-2500"></div>
                            <Skeleton borderRadius={10} baseColor="#ccc" width={300} height={40} duration={2.5} />


                        ) : (
                            <div className="flex gap-x-2">
                                <AlertTip />
                                <h1 className="text-md" ref={(ref: any) => textRef.current = ref}>
                                    {data?.currentCourse?.unique_code}
                                </h1>

                                <span className="relative group cursor-pointer" onClick={copyCode}>
                                    <FontAwesomeIcon icon={faCopy} />
                                    <Tooltip text={`${isCopy ? "Copied" : "Copy"}`} position="bottom" color="bg-gray-800" />
                                </span>
                            </div>
                        )}
                    </div>
                </div>
                <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-4 mx-4'>
                    <div className='bg-green-600 p-4 text-white rounded-lg  '>
                        <span>Classess Number</span>
                        {isLoading ?
                            <div className='flex justify-center'>
                                {/* <FontAwesomeIcon icon={faCircleNotch} size={'1x'} color="black" spin={true} /> */}
                                <Spinner />
                            </div>
                            :
                            <p className='text-[100px]  font-bold  text-center'>{data?.allRelatedClasses?.length || 0}</p>
                        }
                    </div>
                    <div className='bg-yellow-500 p-4 rounded-md text-white'>
                        <span>All Students Number</span>
                        {isLoading ?
                            <div className='flex justify-center'>
                                {/* <FontAwesomeIcon icon={faCircleNotch} size={'1x'} color="black" spin={true} /> */}
                                <Spinner />
                            </div>
                            :
                            <p className='text-[100px]  font-bold text-center'>{data?.allRelatedStudents?.length || 0}</p>
                        }
                    </div>
                    <div className='bg-[#E93858] p-4 rounded-md text-white'>
                        <span>All Teachers Number</span>
                        {isLoading ?
                            <div className='flex justify-center'>
                                {/* <FontAwesomeIcon icon={faCircleNotch} size={'1x'} color="black" spin={true} /> */}
                                <Spinner />
                            </div>
                            :
                            <p className='text-[100px]  font-bold text-center'>{data?.allRelatedTeachers?.length || 0}</p>
                        }
                    </div>
                </div>
            </div >
        </>
    );
};

export default ManagerDashboard;