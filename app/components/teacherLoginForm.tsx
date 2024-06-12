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
import { useDispatch } from 'react-redux';
// import { loginAsManager, loginAsTeacher } from '../../api/api';
import { loginTeacher } from '../../redux/slices/authSlice'
import MaleOrFemale from './maleOrFemale';



const TeacherLoginForm = ({ role, setRole }: { role: any, setRole: any }) => {

    const dispatch = useDispatch()

    const [isPassword, setIsPassword] = useState<boolean>(false)
    const [password, setPassword] = useState<any>()
    const [notification, setNotification] = useState({
        success: false,
        isShow: false,
        content: ''
    })

    const phoneValidation = new RegExp(/^(?:\+|00)?(?:[0-9] ?){6,14}[0-9]$/i)
    const validationSchema = Yup.object({
        fullName: Yup.string().required('Invalid fullName address').required('fullName is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        course: Yup.string().required('Course or School Name is required'),
        phone: Yup.string().required('Phone is required'),
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

    //   {
    //     "fullName":"Masih Muhammadi",
    //     "email":"masihmuhammadi303@gmail.com",
    //     "courseName":"thunder",
    //     "phone":"+987654321",
    //     "password":"masih123",
    //     "role":"manager"
    // }
    let baseUrl = "http://localhost:5000"


    const onSubmit = async (values: any) => {

        setNotification({
            success: true,
            content: "success is only things you need",
            isShow: true
        })

        const payload = {
            email: values.email,
            password: values.password,
            role: role
        }
        console.log(payload, '.......')
        try {
            // const response:any = await axios.post(`${baseUrl}/api/courses/course`, payload);
            const response: any = await dispatch(loginTeacher(payload))
            console.log('Course created:', response.data);
            // route.push(`/course/${response.data?.}`)
        } catch (err: any) {
            setNotification({
                success: false,
                isShow: true,
                content: err,
            })
            console.log('Error creating user: maybe user is alreaady exist');

        }
        // setSubmitting(false);
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
            {notification.isShow &&
                <Notification isShow={notification?.isShow} success={notification.success}>
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
                        <MaleOrFemale role={role} setRole={setRole} />
                        <div className="flex flex-col gap-6  place-items-center ">

                            <div className="relative">

                                <i className="absolute top-5 left-4">
                                    <AccountIcon width={24} height={24} />

                                </i>
                                <label className={`absolute -top-3.5 right-6 transition-position duration-[5000ms] bg-gradientPrimary p-1 px-2 text-xs text-white rounded-lg`}>
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
                                        handleChange(e);
                                        setPassword(e.target.value);
                                    }}

                                    placeholder="Password"
                                    className="border bordre-2 border-gray-700 w-auto sm:w-[380px] min-w-[320px] p-2 px-14 h-14 rounded-md focus:outline-none focus:border-[#1e1e1e] focus:ring-1 focus:ring-[#1e1e1e]"

                                />

                            </div>
                        </div>

                        <div className=" flex  flex-col text-center items-center mt-5 px-10">
                            <Buttons primary={true} type="submit" style="px-10" clickHandler={() => onSubmit(values)}>
                                Login As Teacher
                            </Buttons>
                            <p className="mt-4">
                                You dont have an account?{" "}
                                <Link href="/signup" className="underline">
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default TeacherLoginForm;
