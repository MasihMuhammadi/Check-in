

import React from 'react';

const CourseAdmin = ({ params }: { params: any }) => {
    return (
        <>
            {params.handle}
            This is the <b>{params.handle}</b> course admin dashboard
            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3'>
                <div className='bg-green-600'>Courses Number</div>
                <div className='bg-yellow-500'>All Students Number</div>
                <div>something esle</div>
            </div>
        </>
    );
};

export default CourseAdmin;