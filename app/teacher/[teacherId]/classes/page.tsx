
"use client";
import React, { useState } from 'react';
import Table from '../../../components/table/table';
import DeleteIcon from '../../../../public/smallIcons/deleteIcon';
import EditIcon from '../../../../public/smallIcons/editIcon';
import Header from '../../../components/header'
import ArrowIcon from '../../../../public/smallIcons/arrowIcon'


const SingleTeacher = ({ params }: { params: any }) => {
    const [showMenu, setShowMenu] = useState(false)

    const handleShowMenu = () => {
        setShowMenu(!showMenu)
    }

    return (
        <>

            <Header />
            {/* <div className={`h-96 w-64 bg-gray-500 px-4 relative transition-all duration-400 inline-block ${showMenu ? "translate-x-0" : "-translate-x-64"}`}>
                <div className='flex flex-col gap-y-2'>
                    <div>Your Classes</div>
                    <div>Your Student</div>
                    <div>Add a  Class</div>
                    <div>Add a  Student</div>
                </div>
                <div className={`absolute -right-6 text-3xl ${showMenu ? "-rotate-[90deg]" : "rotate-[90deg]"}`} onClick={handleShowMenu}>
                  
                    <ArrowIcon />
                </div>
            </div> */}
            <p className='mb-6'>Welcome Teacher {params?.teacherId} to this class </p>
            <Table
                headers={[

                    "student ID",
                    "Name",
                    "Father Name",
                    "Days",
                    "Started Time",
                    'End Time',
                    "Student Count",
                    "Edit",
                    "Delete",
                ]}
                bodyRows={[
                    ["S_123", "Math", "Mozamel", "Sat - Thu", "12:00 PM", "1:00 PM", "20",
                        <div key="edit" className='flex items-center justify-center'><EditIcon />
                        </div>,
                        <div key="delete" className='flex items-center justify-center '><DeleteIcon /></div>],
                    ["S_125", "Science", "Mozamel", "Mon - Wed", "3:00 PM", "4:30 PM", "12",
                        <div key="edit" className='flex items-center justify-center'><EditIcon /></div>,
                        <div key="delete" className='flex items-center justify-center'><DeleteIcon /></div>]
                ]}
            />


        </>
    );
};

export default SingleTeacher;
