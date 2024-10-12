/* eslint-disable @typescript-eslint/no-explicit-any */
import { Checkbox } from "../ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../ui/form";

interface FormCheckboxProps {
  form: any;
  name: string;
  label: React.ReactNode;
}

export const FormCheckbox = ({ form, name, label }: FormCheckboxProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-6">
            <FormControl>
              <Checkbox
                className="mt-1"
                checked={field.value}
                onCheckedChange={(checked) => {
                  field.onChange(checked);
                }}
              />
            </FormControl>
            <FormLabel className="text-sm font-normal dark:text-white">{label}</FormLabel>
          </FormItem>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
