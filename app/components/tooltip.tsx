import React from 'react';

interface TooltipProps {
    text: string;
    position?: 'top' | 'bottom' | 'left' | 'right';
    color?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ text, position = 'top', color = 'bg-gray-800' }) => {
    const baseStyles = `absolute z-10 w-max text-white text-center rounded py-1 px-2 ${color}`;

    let tooltipStyle = '';

    switch (position) {
        case 'top':
            tooltipStyle = 'bottom-full left-1/2 transform -translate-x-1/2 mb-2';
            break;
        case 'bottom':
            tooltipStyle = 'top-full left-1/2 transform -translate-x-1/2 mt-2';
            break;
        case 'left':
            tooltipStyle = 'right-full top-1/2 transform -translate-y-1/2 mr-2';
            break;
        case 'right':
            tooltipStyle = 'left-full top-1/2 transform -translate-y-1/2 ml-2';
            break;
    }

    return (
        <div className="relative flex justify-center items-center">
            <span className={`${baseStyles} ${tooltipStyle} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}>
                {text}
            </span>
        </div>
    );
};

export default Tooltip;
