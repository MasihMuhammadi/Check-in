import React, { useState } from 'react';

const AlertTip: React.FC = () => {
    const [isTooltipVisible, setTooltipVisible] = useState(true);

    return (

        <div className="relative inline-block">


            {isTooltipVisible && <div
                className="w-64 absolute bottom-full mb-2 left-1/2 z-20 border border-gray-300 -translate-x-1/2 rounded-2xl bg-white py-3 px-3 text-xs text-gray-800 font-medium transition-opacity duration-300 shadow-[0px_12px_30px_-4px_rgba(16,24,40,0.08)]"
                role="tooltip"
            >
                <span className='float-right cursor-pointer' onClick={() => setTooltipVisible(false)}>x</span>
                <h5 className="text-sm text-gray-800 font-medium mb-1.5">This is a tooltip</h5>
                <p className="text-xs text-gray-500 font-normal mb-2">
                    This is Your Uniqe Code course, please dont share it with anyone expect your teachers,
                    Your Course or School teacher can create a Teacher account based this Unique ID.
                </p>
                <span className="absolute -bottom-1.5 left-1/2 -z-10 h-3 w-3 border-b border-r border-gray-300 -translate-x-1/2 rotate-45 bg-white"></span>
            </div>
            }

        </div>
    );
};

export default AlertTip;
