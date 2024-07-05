
import React from 'react';
import NoCourseFound from '../../public/mockups/noCourseFoundMockup';

const CourseClases = ({ data }: { data: any }) => {
    console.log(data, 'cccccccccccccccccccccccc')
    return (
        <>
            <div className='flex gap-x-10 justify-center flex-wrap'>

                {data?.length > 0 ? data?.map((cls: any) => {
                    return (
                        <>
                            <div className='border shadow-xl rounded-2xl bg-gray-50 w-auto h-auto p-4 text-center'>
                                <p className='font-semibold capitalize'>{cls?.class_name}</p>
                                <p className='font-normal'>{cls?.teacher_name}</p>
                                <p className='font-normal'>Start From <span className="font-bold">{cls?.start_day}</span> to <span className="font-bold">{cls?.finish_day}</span></p>
                            </div>
                        </>
                    )
                })
                    :
                    // <div className="relative">
                    <div className='flex flex-col items-center'>
                        <h1 className='text-3xl'>No Class Found</h1>
                        <NoCourseFound className={"mt-5 w-full sm:w-[450px]  opacity-85 m-auto"} />
                    </div>
                    // </div>
                }
            </div>
        </>
    );
};

export default CourseClases;