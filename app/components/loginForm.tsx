"use client";

import React, { useState } from 'react';
// import { useRouter } from 'next/router'; // Ensure useRouter is imported correctly
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



const LoginForm = () => {
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

    const baseUrl = "http://localhost:5000";

    const onSubmit = async (values: any, { setSubmitting }: { setSubmitting: any }) => {
        try {
            const response = await axios.post(`${baseUrl}/api/auth/login`, values);
            console.log(response, 'rrrrrrrrrrrrrrr'); // Check the entire response object for debugging

            if (response?.data?.success) {
                console.log("Login successful");
                router.push(`/teacher/${response.data?.data?.fullName}/classes`); // Redirect to the specified route
            } else {
                console.log('Login failed:', response?.data?.message);
            }
        } catch (error) {
            console.error("Error:", error);
            console.log("An error occurred while logging in");
        }

        setSubmitting(false);
    };

    return (
        <div className="">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                validateOnChange={false} // To prevent instant validation on password change
            >
                {({ values, handleChange, handleSubmit, isSubmitting }) => (
                    <Form className='flex flex-row justify-center items-center bg-white'>
                        <div className='w-full  bg-primary '>
                            <LoginMockup className="w-[500px] h-[500px ] rounded-xl  border border-white m-10" />
                        </div>
                        <div className="">
                            <div className=" w-full flex justify-center items-center flex-col gap-6 place-items-center px-10">
                                <h1 className="text-4xl text-left mb-5">Welcome Back! Please Sign In</h1>
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
                                        className="border bordre-2 border-gray-700 w-[530px] p-2 px-14 h-14 rounded-md focus:outline-none focus:border-[#1e1e1e] focus:ring-1 focus:ring-[#1e1e1e]"
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
                                        className="border bordre-2 border-gray-700 w-[530px] p-2 px-14 h-14 rounded-md focus:outline-none focus:border-[#1e1e1e] focus:ring-1 focus:ring-[#1e1e1e]"
                                    />
                                </div>
                            </div>
                            <div className=" flex  flex-col text-center items-center mt-5">
                                <Buttons primary={true} type="submit" style="px-12 py-2">
                                    Login
                                </Buttons>
                                <p className="mt-4">
                                    You dont haven't account?{" "}
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

export default LoginForm;
