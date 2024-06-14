
"use client";
import React, { useEffect, useState } from 'react';
import Table from "../../../../../components/table/table"
import DeleteIcon from '../../../../../../public/smallIcons/deleteIcon'
import EditIcon from '../../../../../../public/smallIcons/editIcon';
import Header from '../../../../../components/header'
import ArrowIcon from '../../../../../../public/smallIcons/arrowIcon'
import TableForMobileScreen from '../../../../../components/table/tableForMobileScreen';
import AddStudent from '../../../../../auth/teacher/addStudent';
import AddClass from '../../../../../auth/teacher/addClass';
import { useDispatch, useSelector } from 'react-redux';
import { getTeacherData } from '../../../../../../redux/slices/teacherSlice';
import { useRouter } from 'next/navigation';



const SingleTeacher = ({ params }: { params: any }) => {
    const [showMenu, setShowMenu] = useState(false)
    const dispatch = useDispatch()
    const singleTeacherData = useSelector((state: any) => state.teacherSlice.aTeacherData)

    const router = useRouter();
    // const { courseHandle, teacherHandle } = router.query;

    useEffect(() => {

        dispatch(getTeacherData(params?.teacherHandle))
        console.log(singleTeacherData, 'rrrrrrrrrrrrr')
    }, [dispatch])

    console.log(typeof params?.teacherHandle, 'ppppppppp1123')

    return (
        <>
            <div className='overflow-x-hidden'>
                <div>
                    <h1>main page for teachers redirect after signing in</h1>
                </div>
                {/* <p className='mb-6'>Welcome Teacher {params?.teacherId.split("_")[0]} to this class </p>
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
                </div> */}
            </div>
        </>
    );
};

export default SingleTeacher;
