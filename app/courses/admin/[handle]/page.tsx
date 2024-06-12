

import React from 'react';

const CourseAdmin = ({ params }: { params: any }) => {
    // console.log(params.name, 'pppppppp')
    return (
        <>
            {params.handle}
            This is the <b>{params.handle}</b> course admin dashboard
        </>
    );
};

export default CourseAdmin;