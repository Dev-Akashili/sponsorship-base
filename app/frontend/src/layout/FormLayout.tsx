import { ReactNode } from "react";

interface FormLayoutProps {
  title?: string;
  size?: "bs" | "lg";
  content?: JSX.Element | JSX.Element[];
  children: ReactNode | ReactNode[];
}

export const FormLayout = ({
  title,
  size = "bs",
  content,
  children
}: FormLayoutProps) => {
  return (
    <div className="flex justify-center align-center mt-14 mb-52">
      <div className={`${size === "lg" ? "w-110" : "w-96"} m-auto`}>
        {title && (
          <>
            <h1 className="text-center text-2xl text-slate-600 dark:text-white font-medium my-4">
              {title}
            </h1>
            {content}
          </>
        )}
        <div className=" p-6 m-auto rounded-lg bg-white dark:bg-black">
          {children}
        </div>
      </div>
    </div>
  );
};
