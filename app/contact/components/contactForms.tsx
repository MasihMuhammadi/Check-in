"use client";

import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Link from "next/link";
import AccountIcon from '../../../public/smallIcons/accountIcon';
import MessageIcon from '../../../public/smallIcons/messageIcon';
import EmailIcon from '../../../public/smallIcons/emailIcon';
import Buttons from '../../components/buttons';
import ContactMockup from '../../../public/mockups/contactMockup';
import emailjs from "@emailjs/browser";
import Notification from '../../components/notification';
import Spinner from '../../components/spinner';

const ContactForm = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({ content: "", isShow: false, success: false });
  const [errorMessage, setErrorMessage] = useState('');
  const validationSchema = Yup.object({
    fullName: Yup.string().required('Invalid fullName address').required('fullName is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    message: Yup.string().required('message is required').min(6, 'message should be at least 6 characters'),
  });

  const initialValues = {
    fullName: '',
    email: '',
    message: ''
  };

  const onSubmit = async (values: any, { resetForm }: any) => {
    setIsLoading(true);
    setErrorMessage('');

    const templateParams = {
      name: values.fullName,
      email: values.email,
      message: values.message,
    };

    try {
      await emailjs.send(
        'service_vj51f13', // Replace with your EmailJS service ID
        'template_by4ghif', // Replace with your EmailJS template ID
        templateParams,
        'ddsRC09yGKSqOrNKr' // Replace with your EmailJS user ID
      );
      setNotification({ content: "email sent successfully!", isShow: true, success: true })
      resetForm()
      setIsLoading(false)


    } catch (error: any) {
      setIsLoading(false)

      setNotification({ content: error.text, isShow: true, success: false })
    }
  };

  useEffect(() => {
    const sendNotif = setTimeout(() => {
      setNotification({ content: "", isShow: false, success: false })

    }, 4000)
    return () => clearTimeout(sendNotif)
  }, [notification])

  return (
    <div className="">
      {notification.isShow && (
        <Notification isShow={notification.isShow} success={notification.success}>
          {notification.content}
        </Notification>
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnChange={false}
      >
        {({ values, handleChange, handleSubmit, isSubmitting }) => (
          <Form >
            <div className='w-auto flex flex-col sm:flex-row gap-x-14 justify-between '>
              <div className='w-full'>
                <ContactMockup width={600} height={600} className={"w-full h-full"} />
              </div>
              <div className="mt-20 w-full flex flex-col gap-6  px-10">
                <div className="relative">
                  <i className="absolute top-5 left-4">
                    <AccountIcon width={24} height={24} />
                  </i>
                  <label className={`absolute -top-3.5 right-6 sm:right-8 md:right-10 lg:right-28 transition-position bg-gradientPrimary p-1 px-2 text-xs text-white rounded-lg`}>
                    Name
                  </label>
                  <Field
                    name="fullName"
                    type="fullName"
                    placeholder="Full Name"
                    onChange={handleChange}
                    value={values.fullName}
                    className="border bordre-2 border-gray-700 w-auto sm:w-[380px] min-w-[320px] p-2 px-14 h-14 rounded-md focus:outline-none focus:border-[#1e1e1e] focus:ring-1 focus:ring-[#1e1e1e]"
                  />
                  <ErrorMessage name="fullName" id="fullName" component="div" className=" text-xs text-red-500" />
                </div>
                <div className="relative">
                  <i className="absolute top-5 left-4">
                    <EmailIcon />
                  </i>
                  <label className={`absolute -top-3.5 right-6 sm:right-8 md:right-10 lg:right-28 transition-position bg-gradientPrimary p-1 px-2 text-xs text-white rounded-lg`}>
                    Email
                  </label>
                  <Field
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={handleChange}
                    value={values.email}
                    className="border bordre-2 border-gray-700 w-auto sm:w-[380px] min-w-[320px] p-2 px-14 h-14 rounded-md focus:outline-none focus:border-[#1e1e1e] focus:ring-1 focus:ring-[#1e1e1e]"
                  />
                  <ErrorMessage name="email" component="div" className=" text-xs text-red-500" />
                </div>
                <div className="relative">
                  <i className="absolute top-5 left-4">
                    <MessageIcon />
                  </i>
                  <label className={`absolute -top-3.5 right-6 sm:right-8 md:right-10 lg:right-28 transition-position bg-gradientPrimary p-1 px-2 text-xs text-white rounded-lg`}>
                    Message
                  </label>
                  <Field
                    name="message"
                    as="textarea"
                    placeholder="Message"
                    onChange={handleChange}
                    value={values.message}
                    className="border pt-4 bordre-2 border-gray-700 h-40 w-auto sm:w-[380px] min-w-[320px] p-2 px-14 rounded-md focus:outline-none focus:border-[#1e1e1e] focus:ring-1 focus:ring-[#1e1e1e]"
                  />
                  <ErrorMessage name="message" component="div" className=" text-xs text-red-500" />
                </div>

                <Buttons primary={isLoading ? false : true} disabled={isLoading ? true : false} type="submit" style=''
                >
                  {isLoading ? <Spinner className={"w-5 h-6"} /> : 'Send Message'}
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
