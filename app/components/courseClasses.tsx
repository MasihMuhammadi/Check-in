
import React from 'react';

const CourseClases = ({ data }: { data: any }) => {
    console.log(data, 'ddddddddd')
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