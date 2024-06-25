
import React from 'react';

const CourseTeacher = ({ data }: { data: any }) => {

    return (
        <>
            {data?.map((teach: any) => {
                return (
                    <>
                        <p>{teach?.teacher_name}</p>
                    </>
                )
            })}
        </>
    );
};

export default CourseTeacher;