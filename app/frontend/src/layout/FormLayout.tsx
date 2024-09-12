import { ReactNode } from "react";

interface FormLayoutProps {
  title?: string;
  size?: "bs" | "lg";
  children: ReactNode | ReactNode[];
}

export const FormLayout = ({
  title,
  size = "bs",
  children
}: FormLayoutProps) => {
  return (
    <div className="h-full flex justify-center align-center my-40">
      <div className={`${size === "lg" ? "w-110" : "w-96"} m-auto`}>
        {title && (
          <h1 className="text-center text-2xl text-slate-600 font-medium my-4">
            {title}
          </h1>
        )}
        <div className=" p-6 m-auto rounded-lg bg-white">{children}</div>
      </div>
    </div>
  );
};
