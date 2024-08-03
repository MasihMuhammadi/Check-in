"use client";

import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import Buttons from "../components/buttons";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Link from "next/link";
import axios from "axios";
import { Buffer } from "buffer";
import Footer from "../components/footer/footer";
import SearchInput from "../components/SearchInput";
import NoCourseFound from "../../public/mockups/noCourseFoundMockup";

const Courses = () => {
    const [courseData, setCourseData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchValue, setSearchValue] = useState('');
    const [searchedCourse, setSearchedCourse] = useState([]);
    const [isSearched, setIsSearched] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/public-courses/p-courses', { withCredentials: true });

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

    const searchCourse = () => {
        setIsSearched(true);
        const result = courseData.filter((course: any) => course.courseName.toLowerCase().includes(searchValue.toLowerCase()));
        setSearchedCourse(result);
    };

    useEffect(() => {
        if (searchValue === '') {
            setSearchedCourse([]);
            setIsSearched(false);
        }
    }, [searchValue]);

    const coursesToDisplay = searchedCourse.length > 0 ? searchedCourse : courseData;

    return (
        <div className="">
            {isLoading ?
                <div className="flex items-center justify-center mb-5">
                    <Skeleton width={400} className="rounded-xl" height={50} />
                </div>
                : <SearchInput placeholder="Search course name..." searchValue={searchValue} setSearchValue={setSearchValue} searchHandler={searchCourse} />
            }

            <div className="mb-6 grid grid-cols-1 gap-x-5 sm:gap-x-1 sm:grid-cols-2 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4 xl:grid-cols-4 items-center content-center justify-center gap-4">
                {isLoading ? (
                    Array.from({ length: 8 }).map((_, id) => (
                        <div key={id} className="border border-gray-400 rounded-2xl px-1 mb-5 ">
                            <Skeleton borderRadius={10} baseColor="#f0f0f0" className="h-64 w-full" duration={2.5} />
                            <Skeleton borderRadius={10} baseColor="#f0f0f0" className="h-10 w-full" duration={2.5} />
                            <Skeleton borderRadius={0} baseColor="#f0f0f0" className="mb-1" width={200} height={30} duration={2.5} />
                        </div>
                    ))
                ) : (
                    <>
                        {isSearched && searchedCourse.length === 0 && (
                            <div className="col-span-full text-center text-red-500">
                                No courses found for "{searchValue}"
                            </div>
                        )}
                        {coursesToDisplay.length > 0 ? coursesToDisplay.map((course: any, index: number) => (
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
                                        <p className="text-black text-center font-medium text-xl capitalize mt-2">{course.courseName}</p>
                                        <Buttons secondary={true} style="px-5 text-black mt-4 m-auto">
                                            <Link href={`/courses/${course.handle}`}>
                                                view course
                                            </Link>
                                        </Buttons>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <div className="relative">
                                <NoCourseFound className={"w-full sm:w-[500px] opacity-50 m-auto"} />
                            </div>
                        )}
                    </>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Courses;
