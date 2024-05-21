// SignUpFormInputes.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Buttons from "@/app/components/buttons";
import AccountIcon from "@/public/smallIcons/accountIcon";
import CourseIcon from "@/public/smallIcons/courseIcon";
import PasswordIcon from "@/public/smallIcons/passwordIcon";
import PhoneIcon from "@/public/smallIcons/phoneIcon";
import Link from "next/link";
import ClosedEye from '@/public/smallIcons/closedEye';
import OpenedEye from '@/public/smallIcons/openedEye';
import axios from 'axios';
// import { Controller, useForm } from 'react-hook-form'


const SignUpFormInputes = () => {

  const [isPassword, setIsPassword] = useState<boolean>(false)
  const [password, setPassword] = useState<any>()

  const phoneValidation = new RegExp(/^(?:\+|00)?(?:[0-9] ?){6,14}[0-9]$/i)
  const validationSchema = Yup.object({
    fullName: Yup.string().required('Invalid fullName address').required('fullName is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    course: Yup.string().required('Course or School Name is required'),
    phone: Yup.string().required('Phone is required'),
    password: Yup.string().required('Password is required').min(6, 'password should be at least 6 chracte'),
  });


  const showPassword = () => {
    setIsPassword(!isPassword)
  }
  const initialValues = {
    fullName: '',
    email: '',
    course: '',
    phone: '',
    password: '',
  };

  let baseUrl = "http://localhost:5000"


  const onSubmit = async (values: any, { setSubmitting }: { setSubmitting: any }) => {
    try {
      const response = await axios.post(`${baseUrl}/api/users/user`, values);
      console.log('User created:', response.data);
    } catch (error) {

      console.log('Error creating user: maybe user is alreaady exist');

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
          <Form >
            <div className="flex flex-col gap-6 place-items-center px-10">
              <div className="relative">

                <i className="absolute top-5 left-4">
                  <AccountIcon width={24} height={24} />

                </i>
                <label className={`absolute -top-3.5 right-6 transition-position duration-[5000ms] bg-gradientPrimary p-1 px-2 text-xs text-white rounded-lg`}>
                  name
                </label>
                <Field
                  name="fullName"
                  type="fullName"
                  placeholder="fullName"
                  onChange={handleChange}
                  value={values.fullName}
                  className="border bordre-2 border-gray-700 w-[530px] p-2 px-14 h-14 rounded-md focus:outline-none focus:border-[#1e1e1e] focus:ring-1 focus:ring-[#1e1e1e]"
                />
                <ErrorMessage name="fullName" id="fullName" component="div" className=" text-xs text-red-500" />
              </div>
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
                  className="border bordre-2 border-gray-700 w-[530px] p-2 px-14 h-14 rounded-md focus:outline-none focus:border-[#1e1e1e] focus:ring-1 focus:ring-[#1e1e1e]"
                />
                <ErrorMessage name="email" component="div" className=" text-xs text-red-500" />
              </div>

              <div className="relative">
                <i className="absolute top-5 left-4">
                  <CourseIcon width={24} height={24} />
                </i>
                <label className="absolute -top-3.5 right-6 bg-gradientPrimary p-1 px-2 text-xs text-white rounded-lg">
                  Course or School Name
                </label>
                <Field
                  name="course"
                  type="text"
                  placeholder="Course or School Name"
                  onChange={handleChange}
                  value={values.course}
                  className="border bordre-2 border-gray-700 w-[530px] p-2 px-14 h-14 rounded-md focus:outline-none focus:border-[#1e1e1e] focus:ring-1 focus:ring-[#1e1e1e]"
                />
                <ErrorMessage name="course" component="div" className="text-red-500   text-xs" />
              </div>

              <div className="relative">
                <i className="absolute top-5 left-4">
                  <PhoneIcon width={24} height={24} />
                </i>
                <label className="absolute -top-3.5 right-6 bg-gradientPrimary p-1 px-2 text-xs text-white rounded-lg">
                  Phone
                </label>
                <Field
                  name="phone"
                  onChange={handleChange}
                  values={values.phone}
                  type="text"
                  placeholder="Phone"
                  className="border bordre-2 border-gray-700 w-[530px] p-2 px-14 h-14 rounded-md focus:outline-none focus:border-[#1e1e1e] focus:ring-1 focus:ring-[#1e1e1e]"

                />
                <ErrorMessage name="phone" component="div" className="text-red-500   text-xs" />
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
              <Buttons primary={true} type="submit" >
                Register
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

export default SignUpFormInputes;
