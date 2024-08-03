// SignUpFormInputes.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation'
import Link from "next/link";
import axios from 'axios';
import PasswordIcon from '../../public/smallIcons/passwordIcon'
import PhoneIcon from '../../public/smallIcons/phoneIcon';
import CourseIcon from '../../public/smallIcons/courseIcon';
import AccountIcon from '../../public/smallIcons/accountIcon';
import OpenedEye from '../../public/smallIcons/openedEye';
import ClosedEye from '../../public/smallIcons/closedEye';
import Buttons from './buttons';
import Notification from './notification';
import { useDispatch, useSelector } from 'react-redux';
// import { loginAsManager, loginAsTeacher } from '../../api/api';
import { loginTeacher, setIsLoggedIn, setTeacherData, setWhoIsLoggedIn } from '../../redux/slices/authSlice'
import MaleOrFemale from './maleOrFemale';
import Spinner from './spinner';



const TeacherLoginForm = ({ role, setRole }: { role: any, setRole: any }) => {

    const dispatch = useDispatch()

    const teacherData = useSelector((state: any) => state.authSlice.teacherData)
    const isLogedIn = useSelector((state: any) => state.authSlice.isLoggedIn)

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isPassword, setIsPassword] = useState<boolean>(false)
    const [password, setPassword] = useState<any>()
    const [notification, setNotification] = useState({
        success: false,
        isShow: false,
        content: ''
    })

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required').min(6, 'password should be at least 6 chracte'),
    });

    const route = useRouter()
    const showPassword = () => {
        setIsPassword(!isPassword)
    }
    const initialValues = {
        email: '',
        password: '',
        role: role
    };
    let baseUrl = "http://localhost:5000"


    const onSubmit = async (values: any) => {
        const payload = {
            email: values.email,
            password: values.password,
            role: role
        }
        setIsLoading(true);

        // if (values)
        try {

            const response: any = await dispatch(loginTeacher(payload));
            if (response?.payload?.success) {
                const teacherData = response.payload.data;
                if (teacherData?.course_unique_code) {
                    const courseResponse = await axios.get(`http://localhost:5000/api/courses/unique-course/${teacherData.course_unique_code}`, { withCredentials: true });
                    if (courseResponse?.data?.handle) {
                        dispatch(setTeacherData({ courseData: courseResponse, teacherData: teacherData }))
                        route.push(`/courses/${courseResponse.data.handle}/teacher/${teacherData.handle}`);
                    } else {
                        setNotification({
                            success: false,
                            isShow: true,
                            content: "Failed to retrieve course handle"
                        });
                    }
                } else {
                    setNotification({
                        success: false,
                        isShow: true,
                        content: "No unique course code found for the teacher"
                    });
                }
                dispatch(setIsLoggedIn(true))
                try {
                    const response = await axios.get("http://localhost:5000/api/get-session", { withCredentials: true })
                    if (Object.keys(response?.data?.data)[0] === "manager_access") {
                        dispatch(setWhoIsLoggedIn("manager"))
                    }
                    else {

                        dispatch(setWhoIsLoggedIn("teacher"))
                    }

                } catch (error) {
                    console.error('Error making request:', error);
                }

                setNotification({
                    success: true,
                    isShow: true,
                    content: "You logged in successfully!"
                });
            } else {
                setNotification({
                    success: false,
                    isShow: true,
                    content: response?.payload?.response?.data?.message
                });
            }

            setIsLoading(false);
        } catch (error: any) {
            setIsLoading(false);
            setNotification({
                success: false,
                isShow: true,
                content: error?.response?.data?.message || "An error occurred"
            });
            console.log("Error:", error?.message);
        }
    };

    useEffect(() => {
        const notif = setTimeout(() => {
            setNotification({
                success: false,
                isShow: false,
                content: ""
            });
        }, 5000);

        return () => clearTimeout(notif); // This ensures clearTimeout is called correctly
    }, [notification]);



    return (
        <div className="">
            {notification.isShow && <Notification success={notification.success} isShow={notification.isShow} >
                {notification.content}
            </Notification>}
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                validateOnChange={false}// To prevent instant validation on password change
            >
                {({ values, handleChange, handleSubmit, isSubmitting }) => (
                    <Form className='flex flex-row justify-center items-center bg-white'>
                        <div className="">
                            <div className=" w-full flex justify-center mt-5 items-center flex-col gap-6 place-items-center px-10">
                                <div className="relative">
                                    <i className="absolute top-5 left-4">
                                        <AccountIcon width={24} height={24} />
                                    </i>
                                    <label className="absolute -top-3.5 right-6 transition-position duration-[5000ms] bg-gradientPrimary p-1 px-2 text-xs text-white rounded-lg">
                                        Email
                                    </label>
                                    <Field
                                        name="email"
                                        type="email"
                                        placeholder="email"
                                        onChange={handleChange}
                                        value={values.email}
                                        className="border bordre-2 border-gray-700 w-auto sm:w-[380px] min-w-[320px] p-2 px-14 h-14 rounded-md focus:outline-none focus:border-[#1e1e1e] focus:ring-1 focus:ring-[#1e1e1e]"
                                    />
                                    <ErrorMessage name="email" component="div" className=" text-xs text-red-500" />
                                </div>
                                <div className="relative">
                                    <i className="absolute top-5 left-4">
                                        <PasswordIcon width={24} height={24} />
                                    </i>
                                    <i className="absolute top-5 right-4 cursor-pointer" onClick={showPassword}>
                                        {!isPassword ? <OpenedEye /> : <ClosedEye />}
                                    </i>
                                    <label className="absolute -top-3.5 right-6 text-xs bg-gradientPrimary p-1 px-2 text-white rounded-lg">
                                        Password
                                    </label>
                                    <Field
                                        name="password"
                                        type={isPassword ? "text" : "password"}
                                        value={values.password}
                                        onChange={(e: any) => {
                                            handleChange(e); // Call handleChange function
                                            setPassword(e.target.value); // Set password state
                                        }}
                                        placeholder="Password"
                                        className="border bordre-2 border-gray-700 w-auto sm:w-[380px] min-w-[320px] p-2 px-14 h-14 rounded-md focus:outline-none focus:border-[#1e1e1e] focus:ring-1 focus:ring-[#1e1e1e]"
                                    />
                                    <ErrorMessage name="password" component="div" className=" text-xs text-red-500" />

                                </div>
                            </div>
                            <div className=" flex  flex-col text-center items-center mt-5">
                                <Buttons
                                    primary={isLoading ? false : true}
                                    disabled={isLoading ? true : false}
                                    type="submit" style="px-12 py-2"
                                // clickHandler={() => onSubmit(values)}
                                >
                                    {isLoading ? <Spinner className="w-5 h-5" /> : "Login as Teacher"}
                                </Buttons>
                                <p className="mt-4">
                                    You dont have not account?{" "}
                                    <Link href="/signUp" className="underline">
                                        SignUp
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default TeacherLoginForm;
