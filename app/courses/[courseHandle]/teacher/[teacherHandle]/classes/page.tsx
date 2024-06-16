
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
import Link from 'next/link';



const SingleTeacher = ({ params }: { params: any }) => {
    const [showMenu, setShowMenu] = useState(false)
    const dispatch = useDispatch()
    const singleTeacherData = useSelector((state: any) => state.teacherSlice.aTeacherData)

    // const router = useRouter();
    // let tab: string = 'classes';
    // useEffect(() => {

    //     dispatch(getTeacherData(params?.teacherHandle))
    //     // console.log(response)
    // }, [])



    return (
        <>
            <div className='overflow-x-hidden'>
                <div>
                    <h1>main page for teachers redirect after signing in</h1>
                    {/* <h1>{singleTeacherData?.data?.data?.teacher?.teacher_name}</h1> */}
                </div>
            </div>
        </>
    );
};

export default SingleTeacher;
