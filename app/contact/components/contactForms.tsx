"use client "
import Buttons from "@/app/components/buttons";
import AccountIcon from "@/public/smallIcons/accountIcon";

const ContactForms = () => {
  return (
    <>
      <div className="flex flex-col  gap-6 place-items-center px-10">
        <div className="relative">
          <svg className="absolute left-3 top-4 ">
            <AccountIcon width={30} height={30} />
          </svg>
          <label className="absolute -top-3.5 right-6 bg-gradientPrimary p-1 px-2 text-xs text-white rounded-lg">
            Name
          </label>
          <input
            placeholder="Name"
            type="text"
            className="border bordre-2 border-gray-700 w-[530px] p-2 px-14 h-16 rounded-md focus:outline-none focus:border-[#1e1e1e] focus:ring-1 focus:ring-[#1e1e1e]"
          />
        </div>
        <div className="relative">
          <svg className="absolute left-3 top-4 ">
            <AccountIcon width={30} height={30} />
          </svg>
          <label className="absolute -top-3.5 right-6 bg-gradientPrimary p-1 px-2 text-xs text-white rounded-lg">
            Email
          </label>
          <input
            placeholder="email"
            type="email"
            className="border bordre-2 border-gray-700 w-[530px] p-2 px-14 h-16 rounded-md focus:outline-none focus:border-[#1e1e1e] focus:ring-1 focus:ring-[#1e1e1e]"
          />
        </div>

        <div className="relative">
          <svg className="absolute left-3 top-4 ">
            <AccountIcon width={30} height={30} />
          </svg>
          <label className="absolute -top-3.5 right-6 text-xs bg-gradientPrimary p-1 px-2 text-white rounded-lg">
            Message
          </label>
          <textarea
            rows={6}
            cols={40}
            placeholder="Message"
            className="border bordre-2 border-gray-700 w-[530px] p-2 px-14 rounded-md focus:outline-none focus:border-[#1e1e1e] focus:ring-1 focus:ring-[#1e1e1e]"
          />
        </div>
        {/* <Buttons primary={true}>Send Message</Buttons> */}
        {/* Repeat the same structure for other input fields */}
      </div>
    </>
  );
};

export default ContactForms;
