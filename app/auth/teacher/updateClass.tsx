"use client";

import React, { useState, } from 'react';
import { useRouter } from 'next/navigation';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Link from 'next/link';
import Buttons from '../../components/buttons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, setPageWillShow } from '../../../redux/slices/classSlice';
import Notification from '../../components/notification'

const UpdateClass = ({ data }: { data: any }) => {
    const [isPassword, setIsPassword] = useState<boolean>(false);
    const [notification, setNotification] = useState({
        isShow: false,
        content: "",
        success: false
    })
    const singleTeacherData = useSelector((state: any) => state.teacherSlice.aTeacherData);
    const classData = useSelector((state: any) => state.classSlice.classData);
    const isEditable = useSelector((state: any) => state.classSlice.isEditable);
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

    console.log(data, 'XXX')
    const initialValues = {
        // subject:  || "",
        subject: data[0]?.class_name || "",
        duration: data[0]?.duration || "",
        start_day: data[0]?.start_day || "",
        finish_day: data[0]?.finish_day || "",
        started_time: data[0]?.started_time || "",
        finish_time: data[0]?.finish_time || ""
    };

    const onSubmit = async (values: any) => {


        const payload = {
            // course_name: data?.teacher?.teacher?.courseName,
            course_name: singleTeacherData?.data?.data?.teacher?.courseName,
            class_name: values.subject,
            // teacher_name: data?.teacer?.teacher?.teacher_name,
            teacher_name: singleTeacherData?.data?.data?.teacher?.teacher_name,
            duration: values.duration,
            start_day: values.start_day,
            finish_day: values.finish_day,
            started_time: values.started_time,
            finish_time: values.finish_time,
            handle: singleTeacherData?.data?.data?.teacher?.handle
        };


        try {
            const res: any = await axios.put(`http://localhost:5000/api/classes/class/${data[0]?._id}`, payload)

            if (res?.data?.success) {
                dispatch(setPageWillShow("classes"))
                setNotification({
                    isShow: true,
                    content: res?.payload?.message,
                    success: true
                })
            }
            else {

                setNotification({
                    isShow: true,
                    content: res?.payload?.message,
                    success: false
                })

            }

        }
        catch (err) {
            console.error(err)
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            validateOnChange={false} // To prevent instant validation on password change
        >
            {({ values, handleChange, handleSubmit, isSubmitting }) => (
                <Form className='oveflow-x-hidden' onSubmit={handleSubmit} >
                    {notification?.isShow && <Notification isShow={notification.isShow} success={notification.success}>
                        {notification.content}
                    </Notification>}
                    <div className="">

                        <div className="mt-4 w-full flex justify-center items-center flex-col md:flex-row  gap-6 place-items-center px-10">
                            <div className="relative">
                                <label className="absolute -top-3.5 right-6 transition-position duration-[5000ms] bg-gradientPrimary p-1 px-2 text-xs text-white rounded-lg">
                                    Subject
                                </label>
                                <Field

                                    name="subject"
                                    type="text"
                                    onChange={handleChange}
                                    value={values.subject}
                                    className="border bordre-2 border-gray-700 w-[320px] max-w-full p-2 px-14 h-14 rounded-md focus:outline-none focus:border-[#1e1e1e] focus:ring-1 focus:ring-[#1e1e1e]"
                                />
                                <ErrorMessage name="subject" component="div" className=" text-xs text-red-500" />
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
                                    className="border bordre-2 border-gray-700  w-[320px] max-w-full p-2 px-14 h-14 rounded-md focus:outline-none focus:border-[#1e1e1e] focus:ring-1 focus:ring-[#1e1e1e]"
                                />
                                <ErrorMessage name="duration" component="div" className=" text-xs text-red-500" />
                            </div>
                        </div>

                        <div className="mt-4 w-full flex justify-center items-center flex-col md:flex-row gap-6 place-items-center px-10">
                            <div className="relative">
                                <label className="absolute -top-3.5 right-6 transition-position duration-[5000ms] bg-gradientPrimary p-1 px-2 text-xs text-white rounded-lg">
                                    Start Day
                                </label>
                                <Field
                                    as="select"
                                    name="start_day"
                                    // type="date"
                                    option
                                    onChange={handleChange}
                                    value={values.start_day}
                                    className="border bordre-2 border-gray-700  w-[320px] min-w-full p-2 px-14 h-14 rounded-md focus:outline-none focus:border-[#1e1e1e] focus:ring-1 focus:ring-[#1e1e1e]"
                                >
                                    <option value="Saturday">Saturday</option>
                                    <option value="Sunday">Sunday</option>
                                    <option value="Monday">Monday</option>
                                    <option value="Thursday">Thursday</option>
                                    <option value="Wednsday">Wednsday</option>
                                    <option value="Friday">Friday</option>
                                </Field>
                                <ErrorMessage name="start_day" component="div" className=" text-xs text-red-500" />
                            </div>
                            <div className="relative">
                                <label className="absolute -top-3.5 right-6 transition-position duration-[5000ms] bg-gradientPrimary p-1 px-2 text-xs text-white rounded-lg">
                                    Finish Day
                                </label>
                                <Field
                                    name="finish_day"
                                    as="select"
                                    // type="date"
                                    onChange={handleChange}
                                    value={values.finish_day}
                                    className="border bordre-2 border-gray-700  w-[320px] min-w-full p-2 px-14 h-14 rounded-md focus:outline-none focus:border-[#1e1e1e] focus:ring-1 focus:ring-[#1e1e1e]"
                                >
                                    <option value="Saturday">Saturday</option>
                                    <option value="Sunday">Sunday</option>
                                    <option value="Monday">Monday</option>
                                    <option value="Thursday">Thursday</option>
                                    <option value="Wednsday">Wednsday</option>
                                    <option value="Friday">Friday</option>
                                </Field>
                                <ErrorMessage name="finish_day" component="div" className=" text-xs text-red-500" />
                            </div>
                        </div>

                        <div className="mt-4 w-full flex justify-center items-center flex-col  md:flex-row gap-6 place-items-center px-10">
                            <div className="relative">
                                <label className="absolute -top-3.5 right-6 transition-position duration-[5000ms] bg-gradientPrimary p-1 px-2 text-xs text-white rounded-lg">
                                    Started Time
                                </label>
                                <Field
                                    name="started_time"
                                    type="time"
                                    onChange={handleChange}
                                    value={values.started_time}
                                    className="border bordre-2 border-gray-700  w-[320px] max-w-full p-2 px-14 h-14 rounded-md focus:outline-none focus:border-[#1e1e1e] focus:ring-1 focus:ring-[#1e1e1e]"
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
                                    className="border bordre-2 border-gray-700  w-[320px] max-w-full p-2 px-14 h-14 rounded-md focus:outline-none focus:border-[#1e1e1e] focus:ring-1 focus:ring-[#1e1e1e]"
                                />
                                <ErrorMessage name="finish_time" component="div" className=" text-xs text-red-500" />
                            </div>
                        </div>

                        <div className="mt-4 flex flex-col text-center items-center mt-5">
                            <Buttons primary={true} type="submit" style="px-12 py-2" disabled={isSubmitting} clickHandler={() => onSubmit(values)}>
                                Submit
                            </Buttons>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default UpdateClass;
