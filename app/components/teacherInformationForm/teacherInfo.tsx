"use client";

import React, { useState, } from 'react';
import { useRouter } from 'next/navigation';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Link from 'next/link';
import Buttons from '../buttons';
import { useDispatch } from 'react-redux';
import { fetchData } from '../../../redux/slices/classSlice';

const TeacherInfo = () => {
    const [isPassword, setIsPassword] = useState<boolean>(false);
    const dispatch = useDispatch()
    const router = useRouter();

    const validationSchema = Yup.object({
        subject: Yup.string().required('Subject is required'),
        duration: Yup.string().required('Class Duration is required'),
        start_day: Yup.string().required('Start Day is required'),
        finish_day: Yup.string().required('Finish Day is required'),
        // phone: Yup.string().required('Phone number is required'),
        // email: Yup.string().email("Invalid email address").required("Email is required"),
        // address: Yup.string().required('Address is required'),
        started_time: Yup.string().required('Class started time is required'),
        finish_time: Yup.string().required('Class finish time is required'),
    });

    const showPassword = () => {
        setIsPassword(!isPassword);
    };

    const initialValues = {
        subject: "",
        duration: "",
        start_day: "",
        finish_day: "",
        started_time: "",
        finish_time: ""
    };

    const baseUrl = "http://localhost:5000";

    const onSubmit = async (values: any) => {
        // console.log('Submitting...');

        const payload = {
            course_name: "mozamel",
            class_name: values.subject,
            teacher_name: "masih",
            duration: values.duration,
            start_day: values.start_day,
            finish_day: values.finish_day,
            started_time: values.started_time,
            finish_time: values.finish_time,
        };


        try {
            const res: any = await dispatch(fetchData(payload))
            console.log(res?.payload, 'ressssssssssssssssssssssssssssss')

        }
        catch (err) {
            console.error(err)
        }


        // try {
        //     const response = await axios.post(`${baseUrl}/api/class/add-class`, payload);
        //     console.log("Response:", response);

        //     if (response?.data?.success) {
        //         console.log(response?.data, "Class added successfully");

        //         const teacherName = response.data?.data?.teacher_name;
        //         if (teacherName) {
        //             router.push(`/teacher/${teacherName}/classes`);
        //         } else {
        //             console.log("Teacher name is missing in the response data");
        //         }
        //     } else {
        //         console.log('Submission failed:', response?.data?.message);
        //     }
        // } catch (error) {
        //     console.error("Error:", error);
        //     console.log("An error occurred while submitting the form");
        // }
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
                                    Subject
                                </label>
                                <Field
                                    name="subject"
                                    type="text"
                                    onChange={handleChange}
                                    value={values.subject}
                                    className="border bordre-2 border-gray-700 w-[530px] p-2 px-14 h-14 rounded-md focus:outline-none focus:border-[#1e1e1e] focus:ring-1 focus:ring-[#1e1e1e]"
                                />
                                <ErrorMessage name="s   ubject" component="div" className=" text-xs text-red-500" />
                            </div>
                            <div className="relative">
                                <label className="absolute -top-3.5 right-6 transition-position duration-[5000ms] bg-gradientPrimary p-1 px-2 text-xs text-white rounded-lg">
                                    Duration
                                </label>
                                <Field
                                    name="duration"
                                    type="text"
                                    onChange={handleChange}
                                    value={values.duration}
                                    className="border bordre-2 border-gray-700 w-[530px] p-2 px-14 h-14 rounded-md focus:outline-none focus:border-[#1e1e1e] focus:ring-1 focus:ring-[#1e1e1e]"
                                />
                                <ErrorMessage name="duration" component="div" className=" text-xs text-red-500" />
                            </div>
                        </div>
                        <div className="mt-4 w-full flex justify-center items-center flex-row gap-6 place-items-center px-10">
                            <div className="relative">
                                <label className="absolute -top-3.5 right-6 transition-position duration-[5000ms] bg-gradientPrimary p-1 px-2 text-xs text-white rounded-lg">
                                    Start Day
                                </label>
                                <Field
                                    name="start_day"
                                    type="date"
                                    onChange={handleChange}
                                    value={values.start_day}
                                    className="border bordre-2 border-gray-700 w-[530px] p-2 px-14 h-14 rounded-md focus:outline-none focus:border-[#1e1e1e] focus:ring-1 focus:ring-[#1e1e1e]"
                                />
                                <ErrorMessage name="start_day" component="div" className=" text-xs text-red-500" />
                            </div>
                            <div className="relative">
                                <label className="absolute -top-3.5 right-6 transition-position duration-[5000ms] bg-gradientPrimary p-1 px-2 text-xs text-white rounded-lg">
                                    Finish Day
                                </label>
                                <Field
                                    name="finish_day"
                                    type="date"
                                    onChange={handleChange}
                                    value={values.finish_day}
                                    className="border bordre-2 border-gray-700 w-[530px] p-2 px-14 h-14 rounded-md focus:outline-none focus:border-[#1e1e1e] focus:ring-1 focus:ring-[#1e1e1e]"
                                />
                                <ErrorMessage name="finish_day" component="div" className=" text-xs text-red-500" />
                            </div>
                        </div>
                        {/* <div className="mt-4 w-full flex justify-center items-center flex-row gap-6 place-items-center px-10">
                            <div className="relative">
                                <label className="absolute -top-3.5 right-6 transition-position duration-[5000ms] bg-gradientPrimary p-1 px-2 text-xs text-white rounded-lg">
                                    Phone
                                </label>
                                <Field
                                    name="phone"
                                    type="text"
                                    onChange={handleChange}
                                    value={values.phone}
                                    className="border bordre-2 border-gray-700 w-[530px] p-2 px-14 h-14 rounded-md focus:outline-none focus:border-[#1e1e1e] focus:ring-1 focus:ring-[#1e1e1e]"
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
                                    className="border bordre-2 border-gray-700 w-[530px] p-2 px-14 h-14 rounded-md focus:outline-none focus:border-[#1e1e1e] focus:ring-1 focus:ring-[#1e1e1e]"
                                />
                                <ErrorMessage name="address" component="div" className=" text-xs text-red-500" />
                            </div>
                        </div> */}
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
                                    className="border bordre-2 border-gray-700 w-[530px] p-2 px-14 h-14 rounded-md focus:outline-none focus:border-[#1e1e1e] focus:ring-1 focus:ring-[#1e1e1e]"
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
                                    className="border bordre-2 border-gray-700 w-[530px] p-2 px-14 h-14 rounded-md focus:outline-none focus:border-[#1e1e1e] focus:ring-1 focus:ring-[#1e1e1e]"
                                />
                                <ErrorMessage name="finish_time" component="div" className=" text-xs text-red-500" />
                            </div>
                        </div>
                        <div className="mt-4 flex flex-col text-center items-center mt-5">
                            <Buttons primary={true} type="submit" style="px-12 py-2" disabled={isSubmitting}>
                                Submit
                            </Buttons>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default TeacherInfo;
