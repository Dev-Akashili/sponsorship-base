import { ROUTES } from "@/pages/routes";
import { BookText, Mail, ShieldAlert } from "lucide-react";

export const Footer = () => {
  return (
    <div className="h-36 bg-blue-600">
      <div className="mx-10 flex justify-between">
        <div className="flex flex-col gap-2 mt-8">
          <p className="text-lg text-white font-semibold">SponsorshipBase</p>
          <p className="text-sm text-white ">
            © {new Date().getFullYear()} SponsorshipBase. All rights reserved
          </p>
        </div>
        <div className="flex flex-col mt-8">
          <div className="flex gap-6">
            <div className="flex items-center space-x-1 text-sm text-white cursor-pointer hover:underline">
              <BookText className="size-4" />
              <a href={ROUTES.terms}>Terms and Conditions</a>
            </div>
            <div className="flex items-center space-x-1 text-sm text-white cursor-pointer hover:underline">
              <ShieldAlert className="size-4" />
              <a href={ROUTES.privacy}>Privacy Policy</a>
            </div>
            <div className="flex items-center space-x-1 text-sm text-white cursor-pointer hover:underline">
              <Mail className="size-4" />
              <a href={ROUTES.contact}>Contact</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
