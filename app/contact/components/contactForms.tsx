"use client";

import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Link from "next/link";
import AccountIcon from '../../../public/smallIcons/accountIcon';
import Buttons from '../../components/buttons';
import ContactMockup from '../../../public/mockups/contactMockup';
import axios from 'axios';



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


  const onSubmit = async (values: any,) => {

    const payload = {
      "to": "masihmuhammadi202@gmail.com",
      "subject": "Test Email",
      "text": "This is a test email.",
      "html": "<b>This is a test email.</b>"
    }

    try {

      const response = await axios.post("http://localhost:5000/api/send-email", payload)
    }
    catch (e) {
      console.log(e)
    }
    // setSubmitting(false);
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
            <div className='flex flex-row'>
              <div className='w-auto'>
                <ContactMockup width={600} height={600} />
              </div>
              <div className="mt-20 w-full flex flex-col gap-6 place-items-center px-10">
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
                    className="border bordre-2 border-gray-700 w-auto sm:w-[380px] min-w-[320px] p-2 px-14 h-14 rounded-md focus:outline-none focus:border-[#1e1e1e] focus:ring-1 focus:ring-[#1e1e1e]"
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
                    className="border bordre-2 border-gray-700 w-auto sm:w-[380px] min-w-[320px] p-2 px-14 h-14 rounded-md focus:outline-none focus:border-[#1e1e1e] focus:ring-1 focus:ring-[#1e1e1e]"
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
                    className="border bordre-2 border-gray-700 h-40 w-auto sm:w-[380px] min-w-[320px] p-2 px-14 h-14 rounded-md focus:outline-none focus:border-[#1e1e1e] focus:ring-1 focus:ring-[#1e1e1e]"
                  />
                  <ErrorMessage name="message" component="div" className=" text-xs text-red-500" />
                </div>

                <Buttons primary={true} type="submit" style='px-10' clickHandler={() => onSubmit(values)}>
                  Send Message
                </Buttons>
              </div>
            </div>

          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ContactForm;
