
import React from 'react';
import EditIcon from '../../public/smallIcons/editIcon'
import DeleteIcon from '../../public/smallIcons/deleteIcon'
import { useDispatch, useSelector } from 'react-redux';
import { setIsEditable, setPageWillShow } from '../../redux/slices/classSlice';

const PopUp = ({ data, showEditModal, setShowPopUp, handleEdit, handleDelete }: { data?: any, showEditModal?: any, setShowPopUp?: any, handleEdit?: any, handleDelete?: any }) => {

    return (
        <>
            <div className='bg-white flex flex-col gap-y-3 shadow-lg w-[170px] h-26  px-4 py-2  rounded-[10px] border border-primary absolute z-[1000]'>
                <div className='flex flex-row gap-x-3 items-center justify-center bg-gray-100 px-2 rounded-lg py-1 cursor-pointer' onClick={handleEdit}>
                    <EditIcon />
                    Edit
                </div>
                <div className='flex flex-row gap-x-3 items-center justify-center bg-gray-100 px-2 rounded-lg py-1 cursor-pointer' onClick={handleDelete}>
                    <DeleteIcon />
                    Delete
                </div>
            </div>
        </>
    );
};

export default PopUp;