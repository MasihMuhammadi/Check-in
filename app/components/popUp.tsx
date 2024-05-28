
import React from 'react';
import EditIcon from '../../public/smallIcons/editIcon'
import DeleteIcon from '../../public/smallIcons/deleteIcon'

const PopUp = () => {
    return (
        <>
            <div className='bg-white flex flex-col gap-y-3 shadow-lg w-[170px] h-26  px-4 py-2  rounded-[10px] border border-primary '>
                <div className='flex flex-row gap-x-3 items-center justify-center bg-gray-100 px-2 rounded-lg py-1'>
                    <EditIcon />
                    Edit
                </div>
                <div className='flex flex-row gap-x-3 items-center justify-center bg-gray-100 px-2 rounded-lg py-1'>
                    <DeleteIcon />
                    Delete
                </div>
            </div>
        </>
    );
};

export default PopUp;