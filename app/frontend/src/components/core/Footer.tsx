import { ROUTES } from "@/pages/routes";
import { FaInfoCircle, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoDocumentText, IoMail } from "react-icons/io5";
import { BsShieldFillExclamation } from "react-icons/bs";

export const Footer = () => {
  return (
    <div className="h-36 bg-blue-600 dark:bg-blue-800">
      <div className="mx-10 flex justify-between">
        <div className="flex flex-col gap-2 mt-8">
          <p className="text-lg text-white font-semibold">SponsorshipBase</p>
          <p className="text-sm text-white ">
            © SponsorshipBase {new Date().getFullYear()}
          </p>
        </div>
        <div className="flex flex-col space-y-4 mt-8">
          <div className="flex gap-6">
            <div className="flex items-center space-x-1 text-sm text-white cursor-pointer hover:underline">
              <IoDocumentText className="size-4" />
              <a href={ROUTES.terms}>Terms and Conditions</a>
            </div>
            <div className="flex items-center space-x-1 text-sm text-white cursor-pointer hover:underline">
              <BsShieldFillExclamation className="size-4" />
              <a href={ROUTES.privacy}>Privacy Policy</a>
            </div>
            <div className="flex items-center space-x-1 text-sm text-white cursor-pointer hover:underline">
              <IoMail className="size-4" />
              <a href={ROUTES.contact}>Contact</a>
            </div>
            <div className="flex items-center space-x-1 text-sm text-white cursor-pointer hover:underline">
              <FaInfoCircle className="size-4" />
              <a href={ROUTES.about}>About</a>
            </div>
          </div>
          <div className="flex space-x-4 ml-auto">
            <FaLinkedin className="size-5 text-white" />
            <FaXTwitter className="size-5 text-white" />
            <FaInstagram className="size-5 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};
