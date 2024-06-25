"use client";
import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import Tooltip from '../../../components/tooltip';
import AlertTip from '../../../components/alertTip';
import ManagerDashboard from '../../../components/managerDashboard';
import AllTabs from '../../../components/allTabs';
import CourseClases from '../../../components/courseClasses';
import CourseTeacher from '../../../components/courseTeachers';
import AdminAccount from '../../../components/adminAccount';

const CourseAdmin = ({ params }: { params: any }) => {
    const [currentCourse, setCurrentCourse] = useState<any>();
    const [relatedData, setRelatedData] = useState({
        classes: null,
        students: null,
        teachers: null
    });
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isCopy, setIsCopy] = useState<any>(false);

    const [tab, setTab] = useState<string>("Dashboard");
    const data = {
        currentCourse,
        allRelatedClasses: relatedData.classes,
        allRelatedStudents: relatedData.students,
        allRelatedTeachers: relatedData.teachers,
    };
    const textRef = useRef<any>();

    useEffect(() => {
        const getAllClasses = async () => {
            const response = await axios.get(`http://localhost:5000/api/courses/course/${params.handle}`);
            setCurrentCourse(response?.data);
            try {
                if (response?.statusText === "OK") {
                    const getTeachers = await axios.get(`http://localhost:5000/api/teachers/teacher/${response?.data?.courseName}`);
                    const getClasses = await axios.get(`http://localhost:5000/api/classes/class`);
                    const students = await axios.get(`http://localhost:5000/api/students/course-student/${response?.data?.courseName}`);

                    try {
                        const classes = getClasses?.data?.data?.filter((cls: any) => cls?.course_name === response?.data?.courseName);
                        setRelatedData({
                            classes: classes,
                            students: students?.data,
                            teachers: getTeachers?.data
                        });
                        setIsLoading(false);
                    }
                    catch (error) {
                        console.log(error);
                    }
                }
            }
            catch (err: any) {
                console.log(err?.message);
            }
        };
        getAllClasses();
    }, [params.handle]);

    const copyCode = () => {
        if (textRef.current) {
            const textToCopy = textRef.current.innerText;
            navigator.clipboard.writeText(textToCopy).then(() => {
                setIsCopy(true);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        }
    };

    const renderContent = () => {


        switch (tab) {
            case "Dashboard":
                return <ManagerDashboard data={data} isCopy={isCopy} copyCode={copyCode} isLoading={isLoading} />;

            case "Classes":
                return <div><CourseClases data={relatedData?.classes} /> </div>;
            case "Teachers":
                return <div><CourseTeacher data={relatedData?.teachers} /></div>
            case "Account":
                return <div><AdminAccount data={currentCourse} /></div>;
            default:
                return <div>Dashboard Content</div>;
        }
    };

    return (
        <>
            <AllTabs
                tabs={["Dashboard", "Classes", "Teachers", "Account"]}
                activeTab={tab}
                setActiveTab={setTab}
            />
            {renderContent()}
        </>
    );
};

export default CourseAdmin;
