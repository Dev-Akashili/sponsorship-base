import { ReactNode } from "react";

export const PageLayout = ({
  children
}: {
  children: ReactNode | ReactNode[];
}) => {
  return (
    <div className="h-screen flex justify-center items-center"> {children}</div>
  );
};
