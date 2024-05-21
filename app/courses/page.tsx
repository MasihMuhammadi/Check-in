"use client";
import Image from 'next/image';
import React from 'react';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Buttons from '../components/buttons';
import Link from 'next/link';
import masihImage from '../../public/images/Masih.jpg'
import Header from '../components/header';
import SearchInput from '../components/SearchInput';
import Footer from '../components/footer/footer';
const Courses = () => {
    return (
        <>

            <Header />
            <SearchInput />
            <div className="grid grid-cols-4 gap-4 px-10">

                {Array.from({ length: 20 }, (ele, index) => {
                    return (<>
                        <div className='w-64 h-80 border border-black rounded-2xl flex flex-col items-center justify-center  '>
                            <div className='w-full'>
                                <Skeleton borderRadius={10} baseColor='#333333 ' width="100%" height={40} highlightColor='#555555 ' duration={2.5} />
                            </div>
                            <Image src={masihImage} width={170} height={50} alt="" className="text-center content-center flex items-center justify-center" />
                            <div className='w-full'>
                                <Skeleton count={2} />
                                <Skeleton width={100} height={30} />
                            </div>
                        </div>
                    </>)
                })}
            </div>
            <Footer />
        </>
    );
};

export default Courses;
