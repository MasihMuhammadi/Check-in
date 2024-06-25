"use client";

// import AOS from "aos";
import "aos/dist/aos.css";
// import Image from "next/image";
import Masih from "../../public/images/Masih.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHistory, faPeopleArrowsLeftRight, faRocket } from '@fortawesome/free-solid-svg-icons'

import { useEffect, useState } from "react";
import Buttons from "../components/buttons";

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
// import MasihImage from "../../public/images/Masih.jpg"
import Image from 'next/image';
import masihImage from "../../public/images/Masih.jpg"
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import SonAndFather from "../../public/mockups/sonAndFather";

import { Buffer } from "buffer"
import Footer from "../components/footer/footer";
import SearchInput from "../components/SearchInput";

const Courses = () => {
    const [courseData, setCourseData] = useState<any>()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const baseUrl = "http://localhost:5000";
    const [image, setImage] = useState<any>()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/public-courses/p-courses');

                const coursesWithBase64Images = response.data.map((course: any) => {
                    const base64Image = Buffer.from(course.Images.data, 'binary').toString('base64');
                    return { ...course, base64Image };
                });

                setCourseData(coursesWithBase64Images);
                setIsLoading(false);
            } catch (error) {
                console.error('Error:', error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);


    return (
        <div>
            <SearchInput />
            <img src={image} />
            <div className="grid grid-cols-1 gap-x-5 sm:gap-x-1 sm:grid-cols-2 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4 xl:grid-cols-4 items-center content-center justify-center gap-4">
                {isLoading ? (
                    Array.from({ length: 8 }).map((_, id) => (
                        <div key={id} className="border border-gray-400 rounded-2xl px-1 ">
                            <Skeleton borderRadius={10} baseColor="#f0f0f0" className="h-64 w-full" duration={2.5} />
                            <Skeleton borderRadius={10} baseColor="#f0f0f0" className="h-10 w-full" duration={2.5} />
                            <Skeleton borderRadius={0} baseColor="#f0f0f0" className="mb-1" width={200} height={30} duration={2.5} />
                        </div>
                    ))
                ) : (
                    <>
                        {courseData?.map((course: any, index: number) => (

                            <div key={index} className="flex justify-center items-center">
                                <div className="border border-black w-[300px] h-80 rounded-xl text-blue-500">
                                    <div className="flex items-center justify-center">
                                        <img
                                            src={`data:image/png;base64,${course.base64Image}`}
                                            alt={course.courseName}
                                            className="mt-0.5 object-center"
                                            style={{ width: '295px', borderRadius: "10px", height: '200px' }}
                                        />
                                    </div>
                                    <div className="px-4">
                                        <p className="text-black text-center font-medium text-xl">{course?.courseName}</p>
                                        <Buttons secondary={true} style="px-5 text-black mt-4 ">
                                            <Link href={`/courses/${course?.handle}`}>
                                                view course
                                            </Link>
                                        </Buttons>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Courses;


