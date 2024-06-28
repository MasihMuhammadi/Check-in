
import React from 'react';
import NoTeacherFound from '../../public/mockups/notTeacherFound';

const CourseTeacher = ({ data }: { data: any }) => {

    return (
        <>
            {data?.length > 0 ? data?.map((teach: any) => {
                return (
                    <>
                        <p>{teach?.teacher_name}</p>
                    </>
                )
            })
                :
                <div className='flex flex-col items-center'>
                    <h1 className='text-3xl'>No Teacher Found</h1>
                    <NoTeacherFound className={"w-full sm:w-[550px]   opacity-80 m-auto"} />
                </div>


            }
        </>
    );
};

export default CourseTeacher;