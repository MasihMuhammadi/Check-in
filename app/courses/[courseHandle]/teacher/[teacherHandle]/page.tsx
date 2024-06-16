"use client";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTeacherData } from '../../../../../redux/slices/teacherSlice';
import { useRouter } from 'next/navigation';
import AccountTab from '../../../../components/accountTab';
import Link from 'next/link';
import AllClassesTab from '../../../../components/allClassesTab';

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
            {/* single Teacher Page */}
            <nav className='flex items-center justify-center'>
                <ul className='flex gap-x-5'>
                    <li>
                        <span onClick={() => setTab("account")}>
                            <Link href={`/courses/masih/teacher/${singleTeacherData?.data?.data?.teacher?.handle}?tab=account`}>Account</Link>
                        </span>
                    </li>
                    <li>
                        <span onClick={() => setTab("password")}>
                            <Link href={`/courses/masih/teacher/${singleTeacherData?.data?.data?.teacher?.handle}?tab=password`}>Password</Link>
                        </span>
                    </li>
                    <li>
                        <span onClick={() => setTab("classes")}>
                            <Link href={`/courses/masih/teacher/${singleTeacherData?.data?.data?.teacher?.handle}?tab=classes`}>Classes</Link>
                        </span>
                    </li>
                </ul>
            </nav>
            {tab === 'account' ? (
                <AccountTab />
            ) : tab === 'password' ? (
                <div>Password Component</div> // Replace with actual component if it exists
            ) : tab === 'classes' ? (
                <AllClassesTab data={singleTeacherData?.data?.data} />
            ) : (
                <div>Not Found</div>
            )}
        </>
    );
};

export default TeacherPage;
