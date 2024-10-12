import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { ReactNode } from "react";

interface FormAlertProps {
  title: string;
  type: string;
  link?: ReactNode;
  errors?: string[];
  closeButton: ReactNode;
}

export const FormAlert = ({
  title,
  type,
  link,
  errors,
  closeButton
}: FormAlertProps) => {
  return (
    <Alert
      className={
        type === "error"
          ? "bg-red-200 dark:bg-red-500"
          : type === "success"
          ? "bg-green-300 dark:bg-green-700"
          : "bg-blue-200 dark:bg-blue-500"
      }
    >
      <AlertTitle>
        <div className="flex justify-between items-center">
          <div>{title}</div>
          {closeButton}
        </div>
      </AlertTitle>
      {link && <AlertDescription>{link}</AlertDescription>}
      {errors && errors.length > 1 ? (
        <ul>
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      ) : (
        <AlertDescription>{errors && errors[0]}</AlertDescription>
      )}
    </Alert>
  );
};
