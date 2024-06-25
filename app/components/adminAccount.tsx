"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Link from 'next/link';
import Buttons from './buttons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, setPageWillShow } from '../../redux/slices/classSlice';
import Notification from './notification';

const AdminAccount = ({ data }: { data?: any }) => {

    const [notification, setNotification] = useState({
        isShow: false,
        content: "",
        success: false
    });
    const [isDataExist, setIsDataExist] = useState<any>()
    const [image, setImage] = useState()
    const [isLoading, setIsLoading] = useState(false)


    const validationSchema = Yup.object({
        location: Yup.string().required('Location is required'),
        description: Yup.string().required('Description is required'),
        image: Yup.mixed().required('Image is required') // Validate that image is required
    });


    useEffect(() => {
        const getSingleCourse = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/public-courses/p-courses/${data?.courseName}`)
                setIsDataExist(res?.data)
                const base64Image: any = Buffer.from(res?.data?.Images, 'binary').toString('base64');
                setImage(base64Image)
            }
            catch (e) {
                console.log(e, '...')
            }
        }
        getSingleCourse()
    }, [])
    const initialValues = {
        isVisable: false,
        studentsCount: "",
        teachersCount: "",
        studyFields: "",
        location: isDataExist?.location || "",
        description: isDataExist?.description || "",
        image: isDataExist?.images || null
    };

    const onSubmit = async (values: any) => {

        const formData = new FormData();
        formData.append('isVisable', values.isVisable.toString());
        formData.append('courseName', data?.courseName || "Default Course Name");
        formData.append('location', values.location);
        formData.append('description', values.description);
        formData.append('image', values.image);
        formData.append('handle', data?.handle);
        formData.append('studentsCount', values.studentsCount);
        formData.append('teacherCount', values.teachersCount);
        formData.append('studyFields', values.studyFields);

        try {
            if (!isDataExist?.location) {
                const res = await axios.post('http://localhost:5000/api/public-courses/p-courses', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }
            else {
                const res = await axios.put(`http://localhost:5000/api/public-courses/p-courses/${isDataExist?._id}`, formData)
            }


            // if (res.data.success) {
            //     setNotification({
            //         isShow: true,
            //         content: res.data.message,
            //         success: true
            //     });
            // } else {
            //     setNotification({
            //         isShow: true,
            //         content: res.data.message,
            //         success: false
            //     });
            // }
        } catch (err) {
            console.error(err);
            // setNotification({
            //     isShow: true,
            //     content: 'An error occurred while submitting the form.',
            //     success: false
            // });
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            validateOnChange={false}
        >
            {({ values, handleChange, setFieldValue, handleSubmit, isSubmitting }) => (
                <Form className='overflow-x-hidden' onSubmit={handleSubmit}>
                    {notification?.isShow && (
                        <Notification isShow={notification.isShow} success={notification.success}>
                            {notification.content}
                        </Notification>
                    )}
                    <div className="">
                        <h1>{isDataExist?.location},{isDataExist?.description}</h1>
                        <img
                            src={`data:image/png;base64,${image}`}
                            style={{ width: '200px', height: 'auto' }}
                        />
                        <div className='relative'>
                            <div className='flex justify-center gap-x-4 items-center'>
                                <Field type="checkbox" checked={true} disabled={isDataExist?.isVisable ? true : false} name="isVisable" value={values.isVisable} className="w-10 p-5 text-red-600" id="isVisible" />
                                <label className="" htmlFor='isVisable'>
                                    Do you want to preview your course details on our <Link href="/courses">courses page</Link>?
                                </label>
                            </div>
                        </div>
                        <div className="mt-4 w-full flex justify-center items-center flex-col md:flex-row gap-6 place-items-center px-10">
                            <div className="relative">
                                <label className="absolute -top-3.5 right-6 transition-position duration-[5000ms] bg-gradientPrimary p-1 px-2 text-xs text-white rounded-lg">
                                    Location
                                </label>
                                <Field
                                    name="location"
                                    type="text"
                                    onChange={handleChange}
                                    value={values.location}
                                    className=" border-2 border-gray-700 w-[320px] max-w-full p-2 px-14 h-14 rounded-md focus:outline-none focus:border-[#1e1e1e] focus:ring-1 focus:ring-[#1e1e1e]"
                                />
                                <ErrorMessage name="location" component="div" className="text-xs text-red-500" />
                            </div>
                            <div className="relative">
                                <label className="absolute -top-3.5 right-6 transition-position duration-[5000ms] bg-gradientPrimary p-1 px-2 text-xs text-white rounded-lg">
                                    Description
                                </label>
                                <Field
                                    name="description"
                                    type="text"
                                    onChange={handleChange}
                                    value={values.description}
                                    className="border border-2 border-gray-700 w-[320px] max-w-full p-2 px-14 h-14 rounded-md focus:outline-none focus:border-[#1e1e1e] focus:ring-1 focus:ring-[#1e1e1e]"
                                />
                                <ErrorMessage name="description" component="div" className="text-xs text-red-500" />
                            </div>
                        </div>

                        <div className="mt-4 w-full flex justify-center items-center flex-col md:flex-row gap-6 place-items-center px-10">
                            <div className="relative">
                                <label className="absolute -top-3.5 right-6 transition-position duration-[5000ms] bg-gradientPrimary p-1 px-2 text-xs text-white rounded-lg">
                                    Teacher Count
                                </label>
                                <Field
                                    name="teachersCount"
                                    type="text"
                                    onChange={handleChange}
                                    value={values.teachersCount}
                                    className=" border-2 border-gray-700 w-[320px] max-w-full p-2 px-14 h-14 rounded-md focus:outline-none focus:border-[#1e1e1e] focus:ring-1 focus:ring-[#1e1e1e]"
                                />
                                <ErrorMessage name="teacherCounts" component="div" className="text-xs text-red-500" />
                            </div>
                            <div className="relative">
                                <label className="absolute -top-3.5 right-6 transition-position duration-[5000ms] bg-gradientPrimary p-1 px-2 text-xs text-white rounded-lg">
                                    Student Count
                                </label>
                                <Field
                                    name="studentsCount"
                                    type="text"
                                    onChange={handleChange}
                                    value={values.studentsCount}
                                    className=" border-2 border-gray-700 w-[320px] max-w-full p-2 px-14 h-14 rounded-md focus:outline-none focus:border-[#1e1e1e] focus:ring-1 focus:ring-[#1e1e1e]"
                                />
                                <ErrorMessage name="studentsCount" component="div" className="text-xs text-red-500" />
                            </div>
                        </div>
                        <div className="mt-4 w-full flex justify-center items-center flex-col md:flex-row gap-6 place-items-center px-10">
                            <div className="relative">
                                <label className="absolute -top-3.5 right-6 transition-position duration-[5000ms] bg-gradientPrimary p-1 px-2 text-xs text-white rounded-lg">
                                    Study fileds
                                </label>
                                <Field
                                    name="studyFields"
                                    type="text"
                                    onChange={handleChange}
                                    value={values.studyFields}
                                    className=" border-2 border-gray-700 w-[320px] max-w-full p-2 px-14 h-14 rounded-md focus:outline-none focus:border-[#1e1e1e] focus:ring-1 focus:ring-[#1e1e1e]"
                                />
                                <ErrorMessage name="studyFields" component="div" className="text-xs text-red-500" />
                            </div>
                            <div className="relative">
                                <label className="absolute -top-3.5 right-6 transition-position duration-[5000ms] bg-gradientPrimary p-1 px-2 text-xs text-white rounded-lg">
                                    Image
                                </label>
                                <input
                                    name="image"
                                    type="file"
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        if (event.currentTarget.files) {
                                            setFieldValue('image', event.currentTarget.files[0]);
                                        }
                                    }}
                                    className="border  border-gray-700 w-[320px] max-w-full p-2 px-14 h-14 rounded-md focus:outline-none focus:border-[#1e1e1e] focus:ring-1 focus:ring-[#1e1e1e]"
                                />
                                <ErrorMessage name="image" component="div" className="text-xs text-red-500" />
                            </div>

                        </div>

                        <div className="flex flex-col text-center items-center mt-5">
                            <Buttons primary={true} type="submit" style="px-12 py-2" disabled={isSubmitting}>
                                {isDataExist?.location ? "Update" : "Submit"}
                            </Buttons>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default AdminAccount;
