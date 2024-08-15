import { Github, Linkedin, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <div className="w-full h-36 bg-blue-600 flex justify-center">
      <div className="m-auto text-center">
        <div className="flex gap-4 justify-center">
          <Github className="h-5 w-5 text-slate-200" />
          <Linkedin className="h-5 w-5 text-slate-200" />
          <Twitter className="h-5 w-5 text-slate-200" />
        </div>
        <p className="mt-4 text-xs text-white font-light">
          © SponsorshipBase {new Date().getFullYear()}
        </p>
        <div className="mt-4 flex items-center gap-1 justify-center">
          <p className="text-xs text-white font-light cursor-pointer hover:underline">
            Contact
          </p>
          <p className="text-white">|</p>
          <p className="text-xs text-white font-light cursor-pointer hover:underline">
            Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};
