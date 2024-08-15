import { ReactNode } from "react";

interface FormLayoutProps {
  title?: string;
  children: ReactNode | ReactNode[];
}

export const FormLayout = ({ title, children }: FormLayoutProps) => {
  return (
    <div className="h-screen flex justify-center align-center">
      <div className="w-96 m-auto">
        <h1 className="text-center text-2xl text-slate-600 font-medium my-4">
          {title}
        </h1>
        <div className=" p-6 m-auto rounded-lg bg-white">{children}</div>
      </div>
    </div>
  );
};
