"use client";

import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Tooltip from './tooltip';

const CopyUrlButton = ({ url }: { url: any }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset the copied state after 2 seconds
    };

    return (
        <div className="flex items-center space-x-2">

            <CopyToClipboard text={url} onCopy={handleCopy}>
                <div className="bg-gray-300 cursor-pointer text-black text-sm p-1 rounded">
                    {copied ? 'Copied!' : 'Copy URL'}
                    {/* <Tooltip text="maish" position='bottom' color="gray" key={1} /> */}
                </div>
            </CopyToClipboard>
        </div>
    );
};

export default CopyUrlButton;
