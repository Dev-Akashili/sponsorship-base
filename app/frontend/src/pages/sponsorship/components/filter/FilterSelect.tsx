import { useContext, useEffect, useState } from "react";
import { QueryContext } from "@/context/Query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

export interface FilterSelectProps {
  label: string;
  param: string;
  placeholder?: string;
  options: string[];
  disabled?: boolean;
}

export const FilterSelect = ({
  label,
  param,
  placeholder,
  options,
  disabled = false
}: FilterSelectProps) => {
  const { query, updateQuery } = useContext(QueryContext);
  const [value, setValue] = useState<string | undefined>(undefined);

  const handleSortChange = (value: string) => {
    updateQuery(param, value);
  };

  useEffect(() => {
    const paramsObj = query
      .split("&")
      .filter(Boolean)
      .reduce((acc: Record<string, string>, paramString: string) => {
        const [key, val] = paramString.split("=");
        acc[key] = val;
        return acc;
      }, {});

    if (paramsObj[param]) {
      setValue(paramsObj[param]);
    } else {
      setValue("");
    }
  }, [query, param]);

  return (
    <div className="flex flex-col space-y-1">
      <p className="text-sm text-slate-600 dark:text-white dark:font-semibold">
        {label}
      </p>
      <Select
        onValueChange={(value) => {
          handleSortChange(value);
        }}
        value={value}
        disabled={disabled}
      >
        <SelectTrigger className="dark:border dark:text-white">
          <SelectValue
            placeholder={
              placeholder ? placeholder : value ? value : "Choose an option"
            }
          />
        </SelectTrigger>
        <SelectContent>
          {options.map((option, index) => (
            <SelectItem key={index} value={option.toLowerCase()}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
