"use client";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTeacherData } from '../../../../../redux/slices/teacherSlice';
import { useRouter } from 'next/navigation';
import AccountTab from '../../../../components/accountTab';
import Link from 'next/link';
import AllClassesTab from '../../../../components/allClassesTab';
import axios from 'axios';

const TeacherPage = ({ params }: { params: any }) => {
    const [showMenu, setShowMenu] = useState(false);
    const dispatch = useDispatch();
    const [tab, setTab] = useState<any>('classes');
    const singleTeacherData = useSelector((state: any) => state.teacherSlice.aTeacherData);

    useEffect(() => {
        dispatch(getTeacherData(params?.teacherHandle));
    }, [dispatch, params?.teacherHandle]);



    return (
        <>
            <AllClassesTab data={singleTeacherData?.data?.data} params={params} />
        </>
    );
};

export default TeacherPage;
