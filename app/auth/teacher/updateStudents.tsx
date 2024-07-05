"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Link from 'next/link';
import Buttons from '../../components/buttons'
import { setPageWillShow, setShowFullModal } from '../../../redux/slices/studentSlice';
import { useDispatch } from 'react-redux';
import { setIsEditable } from '../../../redux/slices/classSlice';

const UpdateStudent = ({ data }: { data?: any }) => {
    const [isPassword, setIsPassword] = useState<boolean>(false);
    const dispatch = useDispatch()

    const router = useRouter();

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        father_name: Yup.string().required('Father name is required'),
        course_name: Yup.string().required('Course name is required'),
        class_name: Yup.string().required('Class name is required'),
        phone: Yup.string().required('Phone number is required'),
        email: Yup.string().email("Invalid email address").required("Email is required"),
        address: Yup.string().required('Address is required'),
        started_time: Yup.string().required('Class started time is required'),
        finish_time: Yup.string().required('Class finish time is required'),
    });

    const showPassword = () => {
        setIsPassword(!isPassword);
    };

    const initialValues = {
        name: data?.name || "",
        father_name: data?.father_name || "",
        course_name: data?.course_name || "",
        class_name: data?.class_name || "",
        teacher_name: data?.teacher_name || "",
        phone: data?.phone || "",
        email: data?.email || "",
        address: data?.address || "",
        started_time: data?.started_time || "",
        finish_time: data?.finish_time || "",
        verification_code: data?.verification_code
    };

    const baseUrl = "http://localhost:5000";

    const onSubmit = async (values: any) => {

        const payload = {
            name: values.name,
            father_name: values.father_name,
            course_name: "Mozamel",
            class_name: values.class_name,
            teacher_name: "Masihulllah",
            phone: values.phone,
            email: values.email,
            address: values.address,
            started_time: values.started_time,
            finish_time: values.finish_time,
            verification_code: `${values.name}-${values.father_name}-Masihullah`
        };

        try {
            const response = await axios.put(`${baseUrl}/api/students/student/${data?._id}`, payload, { withCredentials: true });

            if (response?.data?.success) {
                dispatch(setShowFullModal(false))
                dispatch(setIsEditable(false))
            } else {
                console.log('Submission failed:', response?.data?.message);
            }
        } catch (error) {
            console.error("Error:", error);
            console.log("An error occurred while submitting the form");
        }

        // setSubmitting(false);
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            validateOnChange={false} // To prevent instant validation on password change
        >
            {({ values, handleChange, handleSubmit, isSubmitting }) => (
                <Form className='' onSubmit={handleSubmit}>
                    <div className="">
                        <div className="mt-4 w-full flex justify-center items-center flex-row gap-6 place-items-center px-10">
                            <div className="relative">
                                <label className="absolute -top-3.5 right-6 transition-position duration-[5000ms] bg-gradientPrimary p-1 px-2 text-xs text-white rounded-lg">
                                    Student Name
                                </label>
                                <Field
                                    name="name"
                                    type="text"
                                    onChange={handleChange}
                                    value={values.name}
                                    className="border bordre-2 border-gray-700  w-[320px] max-w-full p-2 px-4 h-14 rounded-md focus:outline-none focus:border-[#1e1e1e] focus:ring-1 focus:ring-[#1e1e1e]"

                                />
                                <ErrorMessage name="name" component="div" className=" text-xs text-red-500" />
                            </div>
                            <div className="relative">
                                <label className="absolute -top-3.5 right-6 transition-position duration-[5000ms] bg-gradientPrimary p-1 px-2 text-xs text-white rounded-lg">
                                    Father Name
                                </label>
                                <Field
                                    name="father_name"
                                    type="text"
                                    onChange={handleChange}
                                    value={values.father_name}
                                    className="border bordre-2 border-gray-700  w-[320px] max-w-full p-2 px-4 h-14 rounded-md focus:outline-none focus:border-[#1e1e1e] focus:ring-1 focus:ring-[#1e1e1e]"

                                />
                                <ErrorMessage name="father_name" component="div" className=" text-xs text-red-500" />
                            </div>
                        </div>
                        <div className="mt-4 w-full flex justify-center items-center flex-row gap-6 place-items-center px-10">
                            <div className="relative">
                                <label className="absolute -top-3.5 right-6 transition-position duration-[5000ms] bg-gradientPrimary p-1 px-2 text-xs text-white rounded-lg">
                                    Class Name
                                </label>
                                <Field
                                    name="class_name"
                                    type="text"
                                    onChange={handleChange}
                                    readOnly={true}
                                    disabled={true}
                                    value={values.class_name}
                                    className="border bordre-2 border-gray-700  w-[320px] max-w-full p-2 px-4 h-14 rounded-md focus:outline-none focus:border-[#1e1e1e] focus:ring-1 focus:ring-[#1e1e1e]"

                                />
                                <ErrorMessage name="class_name" component="div" className=" text-xs text-red-500" />
                            </div>
                            <div className="relative">
                                <label className="absolute -top-3.5 right-6 transition-position duration-[5000ms] bg-gradientPrimary p-1 px-2 text-xs text-white rounded-lg">
                                    Email
                                </label>
                                <Field
                                    name="email"
                                    type="text"
                                    onChange={handleChange}
                                    value={values.email}
                                    className="border bordre-2 border-gray-700  w-[320px] max-w-full p-2 px-4 h-14 rounded-md focus:outline-none focus:border-[#1e1e1e] focus:ring-1 focus:ring-[#1e1e1e]"

                                />
                                <ErrorMessage name="email" component="div" className=" text-xs text-red-500" />
                            </div>
                        </div>
                        <div className="mt-4 w-full flex justify-center items-center flex-row gap-6 place-items-center px-10">
                            <div className="relative">
                                <label className="absolute -top-3.5 right-6 transition-position duration-[5000ms] bg-gradientPrimary p-1 px-2 text-xs text-white rounded-lg">
                                    Phone
                                </label>
                                <Field
                                    name="phone"
                                    type="text"
                                    onChange={handleChange}
                                    value={values.phone}
                                    className="border bordre-2 border-gray-700  w-[320px] max-w-full p-2 px-4 h-14 rounded-md focus:outline-none focus:border-[#1e1e1e] focus:ring-1 focus:ring-[#1e1e1e]"

                                />
                                <ErrorMessage name="phone" component="div" className=" text-xs text-red-500" />
                            </div>
                            <div className="relative">
                                <label className="absolute -top-3.5 right-6 transition-position duration-[5000ms] bg-gradientPrimary p-1 px-2 text-xs text-white rounded-lg">
                                    Address
                                </label>
                                <Field
                                    name="address"
                                    type="text"
                                    onChange={handleChange}
                                    value={values.address}
                                    className="border bordre-2 border-gray-700  w-[320px] max-w-full p-2 px-4 h-14 rounded-md focus:outline-none focus:border-[#1e1e1e] focus:ring-1 focus:ring-[#1e1e1e]"

                                />
                                <ErrorMessage name="address" component="div" className=" text-xs text-red-500" />
                            </div>
                        </div>
                        <div className="mt-4 w-full flex justify-center items-center flex-row gap-6 place-items-center px-10">
                            <div className="relative">
                                <label className="absolute -top-3.5 right-6 transition-position duration-[5000ms] bg-gradientPrimary p-1 px-2 text-xs text-white rounded-lg">
                                    Started Time
                                </label>
                                <Field
                                    name="started_time"
                                    type="time"
                                    onChange={handleChange}
                                    value={values.started_time}
                                    className="border bordre-2 border-gray-700  w-[320px] max-w-full p-2 px-4 h-14 rounded-md focus:outline-none focus:border-[#1e1e1e] focus:ring-1 focus:ring-[#1e1e1e]"

                                />
                                <ErrorMessage name="started_time" component="div" className=" text-xs text-red-500" />
                            </div>
                            <div className="relative">
                                <label className="absolute -top-3.5 right-6 transition-position duration-[5000ms] bg-gradientPrimary p-1 px-2 text-xs text-white rounded-lg">
                                    Finish Time
                                </label>
                                <Field
                                    name="finish_time"
                                    type="time"
                                    onChange={handleChange}
                                    value={values.finish_time}
                                    className="border bordre-2 border-gray-700  w-[320px] max-w-full p-2 px-4 h-14 rounded-md focus:outline-none focus:border-[#1e1e1e] focus:ring-1 focus:ring-[#1e1e1e]"

                                />
                                <ErrorMessage name="finish_time" component="div" className=" text-xs text-red-500" />
                            </div>
                        </div>
                        <div className="mt-4 flex flex-col text-center items-center mt-5">
                            <Buttons primary={true} clickHandler={() => onSubmit(values)} type="submit" style="px-12 py-2" disabled={isSubmitting}>
                                Submit
                            </Buttons>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default UpdateStudent;
