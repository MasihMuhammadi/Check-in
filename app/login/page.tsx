"use client";

import React, { useEffect } from "react";

import LoginForm from "../components/loginForm";
import Header from "../components/header";



const Login = () => {
  useEffect(() => {
    console.log(window.location.href);
    if (window.location.href.includes("login")) {
      console.log("login page");
    } else {
      console.log("other page");
    }
  }, []);
  return (
    <>
      <div className="">
        <Header />
        <LoginForm />
      </div>
    </>
  );
};

export default Login;
