/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../ui/select";

interface FormSelectProps {
  form: any;
  name: string;
  label: string;
  placeholder?: ReactNode | string;
  width?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  options: string[];
}

export const FormSelect = ({
  form,
  name,
  label,
  placeholder = "Select an option",
  width = "100%",
  disabled = false,
  onChange,
  options
}: FormSelectProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="mt-2" style={{ width: width }}>
          <FormLabel>{label}</FormLabel>
          <Select
            onValueChange={(value) => {
              field.onChange(value);
              if (onChange) {
                onChange(value);
              }
            }}
            defaultValue={field.value}
            disabled={disabled}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
