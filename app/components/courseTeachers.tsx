
import React from 'react';
import NoTeacherFound from '../../public/mockups/notTeacherFound';

const CourseTeacher = ({ data }: { data: any }) => {

    return (
        <>
            <div className='flex gap-x-10 justify-center flex-wrap'>

                {data?.length > 0 ? data?.map((teach: any) => {
                    return (
                        <>
                            <div className='border shadow-xl rounded-2xl bg-gray-50 w-auto h-auto p-4 py-5 text-center'>
                                <p className='font-semibold capitalize'>Teacher Name: {teach?.teacher_name}</p>
                                <p className='font-normal my-5'>Email: {teach?.teacher_email}</p>
                                {/* <p className='font-normal'>Start From <span className="font-bold">{teach?.start_day}</span> to <span className="font-bold">{teach?.finish_day}</span></p> */}
                            </div>
                        </>
                    )
                })
                    :
                    // <div className="relative">
                    <div className='flex flex-col items-center'>
                        <h1 className='text-3xl'>No Teacher Found</h1>
                        <NoTeacherFound className={"mt-5 w-full sm:w-[450px]  opacity-85 m-auto"} />
                    </div>
                    // </div>
                }
            </div>
        </>
    );
};

export default CourseTeacher;