/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Textarea } from "../ui/textarea";

interface FormInputProps {
  form: any;
  name: string;
  label: string;
  placeholder?: string;
  width?: string;
  type?: string;
  disabled?: boolean;
}

export const FormInput = ({
  form,
  name,
  label,
  placeholder,
  width = "100%",
  disabled = false,
  type
}: FormInputProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="mt-2" style={{ width: width }}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {type === "password" ? (
              <PasswordInput form={field} />
            ) : type === "textarea" ? (
              <Textarea
                placeholder={placeholder}
                className="resize-none"
                rows={6}
                {...field}
              />
            ) : (
              <Input
                placeholder={placeholder}
                type={type ? type : "text"}
                disabled={disabled}
                {...field}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const PasswordInput = ({ form }: { form: any }) => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <div className="flex">
      <Input type={show ? "text" : "password"} {...form} />
      <Button
        type="button"
        variant={"outline"}
        size={"icon"}
        onClick={() => setShow(!show)}
        className="ml-2"
      >
        {show ? <Eye /> : <EyeOff />}
      </Button>
    </div>
  );
};
