"use client";

import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWhoIsLoggedIn } from "../../redux/slices/authSlice";

export default function ClientWrapper({ children }: { children: any }) {
    const dispatch = useDispatch()
    const whoIsLoggedIn = useSelector((state: any) => state.authSlice.whoLoggedIn)

    useEffect(() => {
        const sendRequest = async () => {

            try {
                const response = await axios.get("http://localhost:5000/api/get-session", { withCredentials: true })
                if (Object.keys(response?.data?.data)[0] === "manager_access") {
                    dispatch(setWhoIsLoggedIn("manager"))

                }
                else {

                    dispatch(setWhoIsLoggedIn("teacher"))
                }

            } catch (error) {
                console.error('Error making request:', error);
            }
        };

        sendRequest();
    });

    return (<>
        {children}
    </>);
}
