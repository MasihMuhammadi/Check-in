"use client";

import { useState } from "react";
import FacebookIcon from "../../../public/smallIcons/facebookIcon";
import LinkedinIcon from "../../../public/smallIcons/linkedinIcon";
import WhatsappIcon from "../../../public/smallIcons/whatsappIcon";
import InstagramIcon from "../../../public/smallIcons/instagramIcon";

const SocialMediaShare = () => {
  return (
    <>
      <div className="flex flex-col gap-10 mt-20">
        <div className="cursor-pointer">
          <a
            target="_blank"
            href="https://www.facebook.com/profile.php?id=100064448947289"
          >
            <FacebookIcon width={100} height={100} />
          </a>
        </div>
        <div className="cursor-pointer">
          <a href="">
            <LinkedinIcon width={100} height={100} />
          </a>
        </div>
        <div className="cursor-pointer">
          <a href="https://wa.me/+93749102015">
            <WhatsappIcon width={100} height={100} />
          </a>
        </div>
        <div className="cursor-pointer">
          <a href="https://www.instagram.com/im.masih_muhammadi">
            <InstagramIcon width={100} height={100} />
          </a>
        </div>
      </div>
    </>
  );
};
export default SocialMediaShare;
