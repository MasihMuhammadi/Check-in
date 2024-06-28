
import React from 'react';
import NoCourseFound from '../../public/mockups/noCourseFoundMockup';

const CourseClases = ({ data }: { data: any }) => {

    return (
        <>
            {data?.length > 0 ? data?.map((cls: any) => {
                return (
                    <>
                        <p>{cls?.class_name}</p>
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
        </>
    );
};

export default CourseClases;