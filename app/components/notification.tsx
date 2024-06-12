
import React from 'react';

const Notification = ({ success, isShow, children }: { success: boolean, isShow: boolean, children: any }) => {
    return (
        <>

            <div className={`z-[1000]  h-auto w-auto m-auto p-4 transition-transform duration-[5000ms] rounded-2xl fixed top-0 right-0 ${success ? "text-white bg-green-600 border border-green-600" : "bg-red-600 text-white border border-red-600"} ${isShow ? "translate-x-0" : "translate-x-full"}`}>
                {children}
            </div>

        </>
    );
};

export default Notification;