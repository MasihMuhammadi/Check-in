

import React from 'react';

const FullModal = ({ children, handleClose, showModal, setShowModal }: { children: any, handleClose: any, showModal: boolean, setShowModal?: any }) => {

    return (
        <>
            {showModal &&

                <div className='w-auto h-auto  left-2 sm:left-20 lg:left-[20%] absolute top-0  m-auto  z-[1000]  bg-gray-200 border border-primary shadow-2xl rounded-[40px] px-0 py-6 md:p-10'>
                    <span className="bg-white  p-2 rounded-xl ml-10 cursor-pointer" onClick={handleClose}>Cancel</span>
                    <div>
                        {children}
                    </div>
                </div>
            }

        </>
    );
};

export default FullModal;