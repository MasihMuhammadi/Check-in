"use client";
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setIsLoggedIn, setWhoIsLoggedIn } from '../../redux/slices/authSlice';
import axios from 'axios';
import { useRouter } from "next/navigation";
import Buttons from './buttons';
import { setShowConfirmationPrompt } from '../../redux/slices/headerSlice';


const AdminAccount = ({ data }: { data: any }) => {
    const dispatch = useDispatch()
    const [disabledButton, setDisabledButton] = useState<boolean>(true);
    const [showPrompt, setShowPrompt] = useState<any>(false)
    const [privateId, setPrivateId] = useState("")

    const confirmDeletion = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.checked);
        if (e.target.checked) {
            setDisabledButton(false)
        }
        else {
            setDisabledButton(true)
        }
    }
    const router = useRouter()
    const handleCancel = () => {
        setShowPrompt(false)
    }
    const showConfirmation = () => {
        setShowPrompt(true)
        dispatch(setShowConfirmationPrompt(true))
    }

    useEffect(() => {
        const getPrivateCourse = async () => {
            console.log(data?.handle)
            const res = await axios.get(`http://localhost:5000/api/public-courses/p-courses/${data?.handle}`, { withCredentials: true });
            setPrivateId(res?.data?._id)
        }
        getPrivateCourse()

    }, [])

    const logoutUser = async () => {

        try {
            await axios.delete(`http://localhost:5000/api/public-courses/p-courses/${privateId}`, { withCredentials: true })
            await axios.delete(`http://localhost:5000/api/courses/course/${data?._id}`, { withCredentials: true })
            await axios.post("http://localhost:5000/api/logout", "", { withCredentials: true })

            router.push("/login")
            dispatch(setIsLoggedIn(false))
            dispatch(setWhoIsLoggedIn(""))
            setShowPrompt(false)
        }
        catch (err) {
            console.log(err)
        }
    }


    return (
        <>
            <div className="flex flex-col items-center justify-center">
                {showPrompt &&
                    <div className="h-screen w-screen fixed top-0 left-0 z-50">
                        <div className="absolute top-0 left-0 w-full h-full bg-gray-800 opacity-50 z-40"></div>
                        <div className="flex flex-col justify-center items-center z-50 absolute inset-0">
                            <div className="bg-white border border-black h-[200px] w-[500px] rounded-md p-4">
                                <p className="border-b border-black mb-6 text-xl pb-2">Are you sure you want to Delete your account?</p>
                                <div className="flex gap-x-4 justify-end mt-20">
                                    <Buttons primary={true} style="px-8" clickHandler={logoutUser}>Ok</Buttons>
                                    <Buttons secondary={true} style="px-4" clickHandler={handleCancel}>Cancel</Buttons>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                <p>
                    We are so sorry to lose you!!!
                </p>
                <div>
                    <input
                        type="checkbox"
                        onChange={confirmDeletion}
                    />
                    If you want to delete your account, please check the box below<br />
                </div>
                <button disabled={disabledButton} className={`mt-5 px-3 py-2 rounded ${disabledButton ? "bg-red-300" : "bg-red-600"} text-white`} onClick={showConfirmation}>Delete</button>
            </div>
        </>
    );
};

export default AdminAccount;
