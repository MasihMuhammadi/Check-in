
import React from 'react';

const EditOrDelete = () => {
    return (
        <>
            <div className='bg-white shadow-md z-[100] rounded-xl absolute px-5 top-10 left-5'>
                <div className='flex flex-col gap-y-2'>
                    <div className='flex flex-row gap-x-2'>
                        <p>||</p>
                        <p>Edit</p>
                    </div>
                    <div className='flex flex-row gap-x-2'>
                        <p>||</p>
                        <p>Delete</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditOrDelete;