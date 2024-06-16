

import React from 'react';

const SmallModal = ({ style, time, text, undoButton, undoHandler }: { style: any, time: any, text: any, undoButton: any, undoHandler: any }) => {
    return (
        <>
            <div className=''>
                <div className={`text-center z-[1000] fixed bottom-0 rounded-2xl border   ${style}`}>
                    <h1>{text} {time} sec{"       "} <span onClick={undoHandler} className='underline text-red-500 cursor-pointer'>undo</span></h1>
                </div>
            </div>
        </>
    );
};

export default SmallModal;