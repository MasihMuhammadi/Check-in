import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Buttons from './buttons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, setPageWillShow } from '../../redux/slices/classSlice';
import Notification from './notification';

const AddClassByAdmin = ({ data, teachers, isUpdate, classData, onUpdate }: { data: any, teachers: any, isUpdate: boolean, classData: any, onUpdate: (updatedClassData: any) => void }) => {
    const [initialValues, setInitialValues] = useState({
        subject: "",
        duration: data?.teacher?.courseName || "",
        start_day: "",
        teacherName: "",
        finish_day: "",
        started_time: "",
        finish_time: ""
    });

    const [notification, setNotification] = useState({
        isShow: false,
        content: "",
        success: false
    });

    const singleTeacherData = useSelector((state: any) => state.teacherSlice.aTeacherData);
    const dispatch = useDispatch();

    const validationSchema = Yup.object({
        subject: Yup.string().required('Subject is required'),
        duration: Yup.string().required('Course Name is required'),
        teacherName: Yup.string().required('Teacher Name is required'),
        start_day: Yup.string().required('Start Day is required'),
        finish_day: Yup.string().required('Finish Day is required'),
        started_time: Yup.string().required('Class started time is required'),
        finish_time: Yup.string().required('Class finish time is required'),
    });

    useEffect(() => {
        console.log('Class data for update:', classData);
        if (isUpdate && classData) {
            setInitialValues({
                subject: classData?.class_name || "",
                duration: classData?.course_name || "",
                start_day: classData?.start_day || "",
                teacherName: classData?.teacher_name || "",
                finish_day: classData?.finish_day || "",
                started_time: classData?.started_time || "",
                finish_time: classData?.finish_time || ""
            });
        }
    }, [isUpdate, classData]);


    const onSubmit = async (values: any) => {
        if (!classData?._id) {
            console.error('Class data _id is missing.');
            return;
        }

        const payload = {
            course_name: data?.courseName,
            class_name: values.subject,
            teacher_name: values.teacherName,
            duration: data?.teacher?.courseName,
            start_day: values.start_day,
            finish_day: values.finish_day,
            started_time: values.started_time,
            finish_time: values.finish_time,
            handle: singleTeacherData?.data?.data?.teacher?.handle
        };

        try {
            if (!isUpdate) {
                const res: any = await dispatch(fetchData(payload));
                if (res?.payload?.success) {
                    dispatch(setPageWillShow("classes"));
                    setNotification({
                        isShow: true,
                        content: res?.payload?.message,
                        success: true
                    });
                } else {
                    setNotification({
                        isShow: true,
                        content: res?.payload?.message,
                        success: false
                    });
                }
            } else {
                // Update the class
                const update = await axios.put(`http://localhost:5000/api/classes/class/${classData._id}`, payload);
                console.log(update, 'Updated data');
                setNotification({
                    isShow: true,
                    content: "Class updated successfully",
                    success: true
                });
                // Call onUpdate callback
                // onUpdate(update.data);
                dispatch(setPageWillShow("classes"));
            }
        } catch (err) {
            console.error('Update failed:', err);
            setNotification({
                isShow: true,
                content: "An error occurred",
                success: false
            });
        }
    };

    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            validateOnChange={false}
        >
            {({ values, handleChange, handleSubmit, isSubmitting }) => (
                <Form className='overflow-x-hidden' onSubmit={handleSubmit}>
                    {notification?.isShow && <Notification isShow={notification.isShow} success={notification.success}>
                        {notification.content}
                    </Notification>}
                    <div className="">
                        <div className="mt-4 w-full flex justify-center items-center flex-col md:flex-row gap-6 place-items-center px-10">
                            <div className="relative">
                                <label className="absolute -top-3.5 right-6 transition-position duration-[5000ms] bg-gradientPrimary p-1 px-2 text-xs text-white rounded-lg">
                                    Subject
                                </label>
                                <Field
                                    name="subject"
                                    type="text"
                                    onChange={handleChange}
                                    value={values.subject}
                                    className="border border-2 border-gray-700 w-[320px] max-w-full p-2 px-4 h-14 rounded-md focus:outline-none focus:border-[#1e1e1e] focus:ring-1 focus:ring-[#1e1e1e]"
                                />
                                <ErrorMessage name="subject" component="div" className=" text-xs text-red-500" />
                            </div>
                            <div className="relative">
                                <label className="absolute -top-3.5 right-6 transition-position duration-[5000ms] bg-gradientPrimary p-1 px-2 text-xs text-white rounded-lg">
                                    Teacher name
                                </label>
                                <Field
                                    as="select"
                                    name="teacherName"
                                    onChange={handleChange}
                                    value={values.teacherName}
                                    className="border border-2 border-gray-700 w-[320px] min-w-full p-2 px-4 h-14 rounded-md focus:outline-none focus:border-[#1e1e1e] focus:ring-1 focus:ring-[#1e1e1e]"
                                >
                                    {teachers?.map((teacher: any, idx: number) => (
                                        <option key={idx} value={teacher.teacher_name}>
                                            {teacher.teacher_name}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage name="teacherName" component="div" className=" text-xs text-red-500" />
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
                                    onChange={handleChange}
                                    value={values.start_day}
                                    className="border border-2 border-gray-700 w-[320px] min-w-full p-2 px-4 h-14 rounded-md focus:outline-none focus:border-[#1e1e1e] focus:ring-1 focus:ring-[#1e1e1e]"
                                >
                                    <option value="Saturday">Saturday</option>
                                    <option value="Sunday">Sunday</option>
                                    <option value="Monday">Monday</option>
                                    <option value="Tuesday">Tuesday</option>
                                    <option value="Wednesday">Wednesday</option>
                                    <option value="Thursday">Thursday</option>
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
                                    onChange={handleChange}
                                    value={values.finish_day}
                                    className="border border-2 border-gray-700 w-[320px] min-w-full p-2 px-4 h-14 rounded-md focus:outline-none focus:border-[#1e1e1e] focus:ring-1 focus:ring-[#1e1e1e]"
                                >
                                    <option value="Saturday">Saturday</option>
                                    <option value="Sunday">Sunday</option>
                                    <option value="Monday">Monday</option>
                                    <option value="Tuesday">Tuesday</option>
                                    <option value="Wednesday">Wednesday</option>
                                    <option value="Thursday">Thursday</option>
                                    <option value="Friday">Friday</option>
                                </Field>
                                <ErrorMessage name="finish_day" component="div" className=" text-xs text-red-500" />
                            </div>
                        </div>

                        <div className="mt-4 w-full flex justify-center items-center flex-col md:flex-row gap-6 place-items-center px-10">
                            <div className="relative">
                                <label className="absolute -top-3.5 right-6 transition-position duration-[5000ms] bg-gradientPrimary p-1 px-2 text-xs text-white rounded-lg">
                                    Started Time
                                </label>
                                <Field
                                    name="started_time"
                                    type="time"
                                    onChange={handleChange}
                                    value={values.started_time}
                                    className="border border-2 border-gray-700 w-[320px] max-w-full p-2 px-4 h-14 rounded-md focus:outline-none focus:border-[#1e1e1e] focus:ring-1 focus:ring-[#1e1e1e]"
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
                                    className=" border-2 border-gray-700 w-[320px] max-w-full p-2 px-4 h-14 rounded-md focus:outline-none focus:border-[#1e1e1e] focus:ring-1 focus:ring-[#1e1e1e]"
                                />
                                <ErrorMessage name="finish_time" component="div" className=" text-xs text-red-500" />
                            </div>
                        </div>

                        <div className="flex flex-col text-center items-center mt-5">
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

export default AddClassByAdmin;
