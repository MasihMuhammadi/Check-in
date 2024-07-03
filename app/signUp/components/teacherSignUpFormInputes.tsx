// SignUpFormInputes.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation'
import Link from "next/link";
import axios from 'axios';
import PasswordIcon from '../../../public/smallIcons/passwordIcon';
import PhoneIcon from '../../../public/smallIcons/phoneIcon';
import CourseIcon from '../../../public/smallIcons/courseIcon';
import AccountIcon from '../../../public/smallIcons/accountIcon';
import OpenedEye from '../../../public/smallIcons/openedEye';
import ClosedEye from '../../../public/smallIcons/closedEye';
import Buttons from '../../components/buttons';
import UniqueCodeIcon from '../../../public/smallIcons/uniqueCodeIcon';
import { useDispatch } from 'react-redux';
import { signUpTeacher } from '../../../redux/slices/courseSlice';
import Notification from '../../components/notification';
import Spinner from '../../components/spinner';


const TeacherSignUpFormInputes = ({ role }: { role: any }) => {

    const dispatch = useDispatch()
    const [isPassword, setIsPassword] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [password, setPassword] = useState<any>()
    const [notification, setNotification] = useState({
        success: false,
        isShow: false,
        content: ""
    })

    const phoneValidation = new RegExp(/^(?:\+|00)?(?:[0-9] ?){6,14}[0-9]$/i)
    const validationSchema = Yup.object({
        teacher_name: Yup.string().required('Invalid teacher_name address').required('teacher_name is required'),
        course_unique_code: Yup.string().required('unique code  is required'),
        teacher_email: Yup.string().email('Invalid teacher_email address').required('teacher_email is required'),
        course: Yup.string().required('Course or School Name is required'),
        phone: Yup.string().required('Phone is required'),
        password: Yup.string().required('Password is required').min(6, 'password should be at least 6 chracte'),
    });

    const route = useRouter()
    const showPassword = () => {
        setIsPassword(!isPassword)
    }
    const initialValues = {
        courseName: '',
        course_unique_code: "",
        teacher_name: '',
        teacher_email: '',
        password: '',
        role: role
    };

    let baseUrl = "http://localhost:5000"


    const onSubmit = async (values: any) => {
        setIsLoading(true)
        const payload = {
            courseName: values.courseName,
            course_unique_code: values.course_unique_code,
            teacher_name: values.teacher_name,
            teacher_email: values.teacher_email,
            handle: `${values.teacher_name?.split(" ")?.join("-")}-${values.courseName?.split(" ")?.join("-")}`,
            password: values.password,
            role: role
        }
        try {

            const response: any = await axios.post("http://localhost:5000/api/teachers/teacher", payload, { withCredentials: true })
            setIsLoading(false)
            if (response?.data?.courseName) {
                route.push("/login")
            }
            else {
                console.log('teacher cant created');
            }
        } catch (err: any) {
            setIsLoading(false)
            setNotification({
                success: false,
                isShow: true,
                content: err.response.data.message
            })
            console.log(err?.response?.data?.message);

        }
    };

    useEffect(() => {

        const notif = setTimeout(() => {
            setIsLoading(false)
            setNotification({
                success: true,
                isShow: false,
                content: ""
            })
            return () => clearTimeout(notif);

        }, 10000)
    }, [notification])


    return (
        <div className="">
            {notification.isShow && <Notification success={notification.success} isShow={notification.isShow} >
                {notification.content}
            </Notification>}
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                validateOnChange={false} // To prevent instant validation on password change
            >
                {({ values, handleChange, handleSubmit, isSubmitting }) => (
                    <Form >
                        <div className="flex flex-col gap-6  place-items-center ">
                            <div className="relative">
                                <i className="absolute top-5 left-4">
                                    <CourseIcon width={24} height={24} />
                                </i>
                                <label className="absolute -top-3.5 right-6 bg-gradientPrimary p-1 px-2 text-xs text-white rounded-lg">
                                    Course or School Name
                                </label>
                                <Field
                                    name="courseName"
                                    type="text"
                                    placeholder="Course or School Name"
                                    onChange={handleChange}
                                    value={values.courseName}
                                    className="border bordre-2 border-gray-700 w-auto sm:w-[380px] min-w-[320px] p-2 px-14 h-14 rounded-md focus:outline-none focus:border-[#1e1e1e] focus:ring-1 focus:ring-[#1e1e1e]"
                                />
                                <ErrorMessage name="courseName" component="div" className="text-red-500   text-xs" />
                            </div>

                            <div className="relative">
                                <i className="absolute top-2 left-1">
                                    <UniqueCodeIcon width={40} height={40} />
                                </i>
                                <label className="absolute -top-3.5 right-6 bg-gradientPrimary p-1 px-2 text-xs text-white rounded-lg">
                                    Unique Code
                                </label>
                                <Field
                                    name="course_unique_code"
                                    onChange={handleChange}
                                    values={values.course_unique_code}
                                    type="text"
                                    placeholder="course_unique_code"
                                    className="border bordre-2 border-gray-700 w-auto sm:w-[380px] min-w-[320px] p-2 px-14 h-14 rounded-md focus:outline-none focus:border-[#1e1e1e] focus:ring-1 focus:ring-[#1e1e1e]"

                                />
                                <ErrorMessage name="course_unique_code" component="div" className="text-red-500   text-xs" />
                            </div>

                            <div className="relative">

                                <i className="absolute top-5 left-4">
                                    <AccountIcon width={24} height={24} />

                                </i>
                                <label className={`absolute -top-3.5 right-6 transition-position duration-[5000ms] bg-gradientPrimary p-1 px-2 text-xs text-white rounded-lg`}>
                                    teacher_email
                                </label>
                                <Field
                                    name="teacher_email"
                                    type="teacher_email"
                                    placeholder="teacher_email"
                                    onChange={handleChange}
                                    value={values.teacher_email}
                                    className="border bordre-2 border-gray-700 w-auto sm:w-[380px] min-w-[320px] p-2 px-14 h-14 rounded-md focus:outline-none focus:border-[#1e1e1e] focus:ring-1 focus:ring-[#1e1e1e]"
                                />
                                <ErrorMessage name="teacher_email" component="div" className=" text-xs text-red-500" />
                            </div>



                            <div className="relative ">
                                <i className="absolute top-5 left-4">
                                    <AccountIcon width={24} height={24} />
                                </i>
                                <label className={`absolute -top-3.5 right-6 transition-position duration-[5000ms] bg-gradientPrimary p-1 px-2 text-xs text-white rounded-lg`}>
                                    name
                                </label>
                                <Field
                                    name="teacher_name"
                                    type="teacher_name"
                                    placeholder="teacher_name"
                                    onChange={handleChange}
                                    value={values.teacher_name}
                                    className="border bordre-2 border-gray-700 w-auto sm:w-[380px] min-w-[320px]  p-2 px-14 h-14 rounded-md focus:outline-none focus:border-[#1e1e1e] focus:ring-1 focus:ring-[#1e1e1e]"
                                />
                                <ErrorMessage name="teacher_name" id="teacher_name" component="div" className=" text-xs text-red-500" />
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
                                        handleChange(e);
                                        setPassword(e.target.value);
                                    }}

                                    placeholder="Password"
                                    className="border bordre-2 border-gray-700 w-auto sm:w-[380px] min-w-[320px] p-2 px-14 h-14 rounded-md focus:outline-none focus:border-[#1e1e1e] focus:ring-1 focus:ring-[#1e1e1e]"

                                />

                            </div>
                        </div>

                        <div className=" flex  flex-col text-center items-center mt-5 px-10">
                            <Buttons
                                primary={isLoading ? false : true}
                                disabled={isLoading ? true : false}
                                type="submit" clickHandler={() => onSubmit(values)} style="px-10">
                                {isLoading ? <Spinner className="w-5 h-5" /> : "Register"}
                            </Buttons>
                            <p className="mt-4">
                                You dont have an account?{" "}
                                <Link href="/login" className="underline">
                                    Login
                                </Link>
                            </p>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default TeacherSignUpFormInputes;
