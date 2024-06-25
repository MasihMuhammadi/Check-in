
import React from 'react';

const CourseClases = ({ data }: { data: any }) => {

    return (
        <>
            {data?.map((cls: any) => {
                return (
                    <>
                        <p>{cls?.class_name}</p>
                    </>
                )
            })}
        </>
    );
};

export default CourseClases;