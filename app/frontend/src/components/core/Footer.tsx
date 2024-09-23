import { BookText, Github, Linkedin, ShieldAlert, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <div className="w-full h-36 bg-blue-600 flex justify-center">
      <div className="m-auto text-center">
        <div className="flex gap-4 justify-center">
          <Github className="h-5 w-5 text-slate-200" />
          <Linkedin className="h-5 w-5 text-slate-200" />
          <Twitter className="h-5 w-5 text-slate-200" />
        </div>
        <p className="mt-4 text-sm text-white ">
          © SponsorshipBase {new Date().getFullYear()}
        </p>
        <div className="mt-4 flex items-center gap-1 justify-center">
          <div className="flex space-x-1 text-xs text-white cursor-pointer hover:underline">
            <BookText className="size-4" />
            <p>Terms and Conditions</p>
          </div>
          <p className="text-white">|</p>
          <div className="flex space-x-1 text-xs text-white cursor-pointer hover:underline">
            <ShieldAlert className="size-4" />
            <p>Privacy Policy</p>
          </div>
        </div>
      </div>
    </div>
  );
};
