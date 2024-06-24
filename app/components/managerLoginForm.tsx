"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import OpenedEye from '../../public/smallIcons/openedEye';
import ClosedEye from '../../public/smallIcons/closedEye';
import PasswordIcon from '../../public/smallIcons/passwordIcon';
import AccountIcon from '../../public/smallIcons/accountIcon';
import axios from 'axios';
import Buttons from './buttons';
import Link from 'next/link';
import LoginMockup from '../../public/mockups/loginMockup';
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedIn } from '../../redux/slices/courseSlice';
import { loginAsManager } from '../../api/api';
import MaleOrFemale from './maleOrFemale';
import { loginManager } from '../../redux/slices/authSlice';
import Notification from './notification';



const ManagerLoginForm = ({ role, setRole }: { role: any, setRole: any }) => {
    const dispatch = useDispatch();
    const managerData = useSelector((state: any) => state.authSlice.managerData)
    const [notification, setNotification] = useState({
        success: false,
        isShow: false,
        content: ""
    })

    const [isPassword, setIsPassword] = useState<boolean>(false);
    const [password, setPassword] = useState<any>();
    const router = useRouter(); // Move useRouter here, outside of any function

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required').min(6, 'Password should be at least 6 characters'),
    });

    const showPassword = () => {
        setIsPassword(!isPassword);
    };

    const initialValues = {
        email: '',
        password: '',
    };
    const onSubmit = async (values: any) => {
        const payload = {
            email: values.email,
            password: values.password,
            role: role
        }

        try {
            const response: any = await dispatch(loginManager(payload))
            if (response?.payload?.success) {
                setNotification({
                    success: true,
                    isShow: true,
                    content: "You logged SuccessFully!!!"
                })

                router.push(`/courses/admin/${response?.payload?.data?.handle}`)
            }

            else {
                console.log(response, 'rrr')
                setNotification({
                    success: false,
                    isShow: true,
                    content: response?.error?.message
                })
            }

        } catch (error: any) {
            setNotification({
                success: false,
                isShow: true,
                content: "An error occured"
            })
            console.log("Error:", error?.message);
        }
    };

    useEffect(() => {

        const notif = setTimeout(() => {
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
                                </div>
                            </div>
                            <div className=" flex  flex-col text-center items-center mt-5">
                                <Buttons primary={true} type="submit" style="px-12 py-2"
                                >
                                    Loginnn
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

export default ManagerLoginForm;
