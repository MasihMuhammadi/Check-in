"use client";

import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Link from "next/link";

import AccountIcon from '../../../public/smallIcons/accountIcon';
import Buttons from '../../components/buttons';



const ContactForm = () => {

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
    message: ''
  };

  let baseUrl = "http://localhost:5000"


  const onSubmit = async (values: any, { setSubmitting }: { setSubmitting: any }) => {
    // try {
    //   const response = await axios.post(`${baseUrl}/api/users/user`, values);
    //   console.log('User created:', response.data);
    // } catch (error) {

    //   console.log('Error creating user: maybe user is alreaady exist');

    // }
    console.log(values, 'vvvvvvvvvvvvvvvv')
    setSubmitting(false);
  };


  return (
    <div className="">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnChange={false} // To prevent instant valid ation on password change
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
                  <AccountIcon width={24} height={24} />
                </i>
                <label className={`absolute -top-3.5 right-6 transition-position duration-[5000ms] bg-gradientPrimary p-1 px-2 text-xs text-white rounded-lg`}>
                  Email
                </label>
                <Field

                  name="message"
                  type="textare"
                  placeholder="Messsage"
                  onChange={handleChange}
                  value={values.message}
                  className="border bordre-2 border-gray-700 w-[530px] p-2 px-14 h-14 rounded-md focus:outline-none focus:border-[#1e1e1e] focus:ring-1 focus:ring-[#1e1e1e]"
                />
                <ErrorMessage name="message" component="div" className=" text-xs text-red-500" />
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

export default ContactForm;
