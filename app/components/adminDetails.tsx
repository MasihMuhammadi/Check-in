"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Link from 'next/link';
import Buttons from './buttons';
import Notification from './notification';
import Skeleton from 'react-loading-skeleton';

const AdminDetails = ({ data }: { data?: any }) => {
    const [notification, setNotification] = useState({
        isShow: false,
        content: "",
        success: false
    });
    const [isDataExist, setIsDataExist] = useState<any>(null);
    const [image, setImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true); // Initialize to true to show skeleton
    const [initialValues, setInitialValues] = useState({
        isVisable: true,
        studentsCount: "",
        teachersCount: "",
        studyFields: "",
        location: "",
        description: "",
        image: null
    });

    const validationSchema = Yup.object({
        location: Yup.string().required('Location is required'),
        description: Yup.string().required('Description is required')
    });

    useEffect(() => {
        const getSingleCourse = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/public-courses/p-courses/${data?.handle}`, { withCredentials: true });
                const fetchedData = res.data;
                setIsDataExist(fetchedData);
                const base64Image: any = Buffer.from(fetchedData.Images, 'binary').toString('base64');
                setImage(base64Image);

                setInitialValues({
                    isVisable: fetchedData.isVisable || true,
                    studentsCount: fetchedData.studentsCount || "",
                    teachersCount: fetchedData.teacherCount || "",
                    studyFields: fetchedData.studyFields || "",
                    location: fetchedData.location || "",
                    description: fetchedData.description || "",
                    image: base64Image || null
                });

                setIsLoading(false);
            } catch (e) {
                setIsLoading(false); // Stop loading if there's an error
            }
        };

        if (data?.courseName) {
            getSingleCourse();
        } else {
            setIsLoading(false); // Stop loading if there's no courseName
        }
    }, [data?.courseName]);

    const onSubmit = async (values: any) => {
        const formData = new FormData();
        formData.append('isVisable', values.isVisable);
        formData.append('courseName', data?.courseName || "Default Course Name");
        formData.append('location', values.location);
        formData.append('description', values.description);
        formData.append('handle', data?.handle);
        formData.append('studentsCount', values.studentsCount);
        formData.append('teacherCount', values.teachersCount);
        formData.append('studyFields', values.studyFields);

        if (values.image) {
            formData.append('image', values.image);
        }

        try {
            let response;
            if (!isDataExist?.location) {
                response = await axios.post('http://localhost:5000/api/public-courses/p-courses', formData, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                });
            } else {
                response = await axios.put(`http://localhost:5000/api/public-courses/p-courses/${isDataExist._id}`, formData, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                });
            }

            console.log('Server response:', response.data);

            // Fetch the updated course data
            const updatedCourse = await axios.get(`http://localhost:5000/api/public-courses/p-courses/${data?.handle}`, { withCredentials: true });

            // Update the state with the latest course data
            setIsDataExist(updatedCourse.data);
            setImage(Buffer.from(updatedCourse.data.Images, 'binary').toString('base64'));

            setNotification({
                isShow: true,
                content: 'Course details saved successfully!',
                success: true
            });
        } catch (err) {
            console.error(err);
            setNotification({
                isShow: true,
                content: 'An error occurred while submitting the form.',
                success: false
            });
        }
    };

    useEffect(() => {
        const notif = setTimeout(() => {
            setNotification({
                isShow: false,
                content: "",
                success: false
            });
        }, 3000);
        return () => clearTimeout(notif);
    }, [notification.isShow]);

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize
        >
            {({ values, handleChange, setFieldValue, handleSubmit, isSubmitting }) => (
                <Form className='overflow-x-hidden' onSubmit={handleSubmit}>
                    {notification.isShow && (
                        <Notification isShow={notification.isShow} success={notification.success}>
                            {notification.content}
                        </Notification>
                    )}
                    {isLoading ? (
                        <div className='flex flex-col items-center justify-center'>
                            <Skeleton width={200} className='mt-2 h-40 items-center justify-center' count={1} />
                            <Skeleton width={400} className='mt-2 h-10 items-center justify-center' count={5} />
                        </div>
                    ) : (
                        <div className='flex flex-col items-center '>
                            {image && (
                                <img
                                    src={`data:image/png;base64,${image}`}
                                    style={{ width: '200px', height: 'auto', borderRadius: "10px" }}
                                />
                            )}

                            <div className="mt-10 w-full flex justify-center items-center flex-col md:flex-row gap-6 place-items-center px-10">
                                <div className="relative">
                                    <label className="absolute -top-3.5 right-6 transition-position duration-[5000ms] bg-gradientPrimary p-1 px-2 text-xs text-white rounded-lg">
                                        Location
                                    </label>
                                    <Field
                                        name="location"
                                        type="text"
                                        onChange={handleChange}
                                        value={values.location}
                                        className="border-2 border-gray-700 w-[320px] max-w-full p-2 px-4 h-14 rounded-md focus:outline-none focus:border-[#1e1e1e] focus:ring-1 focus:ring-[#1e1e1e]"
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
                                        className="border border-2 border-gray-700 w-[320px] max-w-full p-2 px-4 h-14 rounded-md focus:outline-none focus:border-[#1e1e1e] focus:ring-1 focus:ring-[#1e1e1e]"
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
                                        type="number"
                                        inputmode="numeric"
                                        onChange={handleChange}
                                        value={values.teachersCount}
                                        className=" border-2 border-gray-700 w-[320px] max-w-full p-2 px-4 h-14 rounded-md focus:outline-none focus:border-[#1e1e1e] focus:ring-1 focus:ring-[#1e1e1e]"
                                    />
                                    <ErrorMessage name="teachersCount" component="div" className="text-xs text-red-500" />
                                </div>
                                <div className="relative">
                                    <label className="absolute -top-3.5 right-6 transition-position duration-[5000ms] bg-gradientPrimary p-1 px-2 text-xs text-white rounded-lg">
                                        Student Count
                                    </label>
                                    <Field
                                        name="studentsCount"
                                        type="number"
                                        inputmode="numeric"
                                        onChange={handleChange}
                                        value={values.studentsCount}
                                        className=" border-2 border-gray-700 w-[320px] max-w-full p-2 px-4 h-14 rounded-md focus:outline-none focus:border-[#1e1e1e] focus:ring-1 focus:ring-[#1e1e1e]"
                                    />
                                    <ErrorMessage name="studentsCount" component="div" className="text-xs text-red-500" />
                                </div>
                            </div>

                            <div className="mt-4 w-full flex justify-center items-center flex-col md:flex-row gap-6 place-items-center px-10">
                                <div className="relative">
                                    <label className="absolute -top-3.5 right-6 transition-position duration-[5000ms] bg-gradientPrimary p-1 px-2 text-xs text-white rounded-lg">
                                        Study fields
                                    </label>
                                    <Field
                                        name="studyFields"
                                        type="text"
                                        onChange={handleChange}
                                        value={values.studyFields}
                                        className=" border-2 border-gray-700 w-[320px] max-w-full p-2 px-4 h-14 rounded-md focus:outline-none focus:border-[#1e1e1e] focus:ring-1 focus:ring-[#1e1e1e]"
                                    />
                                    <ErrorMessage name="studyFields" component="div" className="text-xs text-red-500" />
                                </div>
                                <div className="relative">
                                    <label className="absolute -top-3.5 right-6 transition-position duration-[5000ms] bg-gradientPrimary p-1 px-2 text-xs text-white rounded-lg">
                                        Image
                                    </label>
                                    <input
                                        required={isDataExist?.Images ? false : true}
                                        name="image"
                                        type="file"
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            if (event.currentTarget.files) {
                                                setFieldValue('image', event.currentTarget.files[0]);
                                            }
                                        }}
                                        className="border  border-gray-700 w-[320px] max-w-full p-2 px-4 h-14 rounded-md focus:outline-none focus:border-[#1e1e1e] focus:ring-1 focus:ring-[#1e1e1e]"
                                    />
                                    <ErrorMessage name="image" component="div" className="text-xs text-red-500" />
                                </div>
                            </div>

                            <div className='relative mt-5'>
                                <div className='flex justify-center gap-x-4 items-center'>
                                    <Field type="checkbox" disabled={true} name="isVisable" value={values.isVisable} className="w-10 p-5 text-red-600" id="isVisible" />
                                    <label htmlFor='isVisable' className='text-gray-400'>
                                        Do you want to preview your course details on our <Link href="/courses">courses page</Link>?
                                    </label>
                                </div>
                            </div>

                            <div className="flex flex-col text-center items-center mt-5">
                                <Buttons primary={true} type="submit" style="px-12 py-2" disabled={isSubmitting}>
                                    {isDataExist?.location ? "Update" : "Submit"}
                                </Buttons>
                            </div>
                        </div>
                    )}
                </Form>
            )}
        </Formik>
    );
};

export default AdminDetails;
