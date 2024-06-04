
"use client";
import React, { useState } from 'react';
import Table from '../../../components/table/table';
import DeleteIcon from '../../../../public/smallIcons/deleteIcon';
import EditIcon from '../../../../public/smallIcons/editIcon';
import Header from '../../../components/header'
import ArrowIcon from '../../../../public/smallIcons/arrowIcon'
import TableForMobileScreen from '../../../components/table/tableForMobileScreen';
import AddStudent from '../../../auth/teacher/addStudent';



const SingleTeacher = ({ params }: { params: any }) => {
    const [showMenu, setShowMenu] = useState(false)

    const handleShowMenu = () => {
        setShowMenu(!showMenu)
    }

    return (
        <>
            <div className='overflow-x-hidden'>

                <Header />
                <p className='mb-6'>Welcome Teacher {params?.teacherId} to this class </p>
                <div className="hidden sm:block">
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
                </div>
                <div className="block sm:hidden ">
                    <TableForMobileScreen isStudent={false} />
                </div>
            </div>
        </>
    );
};

export default SingleTeacher;
