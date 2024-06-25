
"use client";

import React from 'react';
import {
    FacebookShareButton,
    LinkedinShareButton,
    WhatsappShareButton,
    FacebookIcon,
    LinkedinIcon,
    WhatsappIcon,
    TelegramShareButton,
    TelegramIcon,
} from 'react-share';

const ShareButtons = ({ url, title }: { url: string; title: string }) => {
    return (
        <div className="flex space-x-2">
            <FacebookShareButton url={url} title={title}>
                <FacebookIcon size={32} round />
            </FacebookShareButton>
            <LinkedinShareButton url={url} title={title}>
                <LinkedinIcon size={32} round />
            </LinkedinShareButton>
            <WhatsappShareButton url={url} title={title}>
                <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            <TelegramShareButton url={url} title={title}>
                <TelegramIcon size={32} round />
            </TelegramShareButton>

        </div>
    );
};

export default ShareButtons;
