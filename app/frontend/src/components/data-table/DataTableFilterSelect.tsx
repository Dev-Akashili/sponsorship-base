import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../ui/select";
import { useEffect, useState } from "react";

export interface DataTableFilterSelectProps {
  label: string;
  param: string;
  placeholder?: string;
  options: string[];
  disabled?: boolean;
}

export const DataTableFilterSelect = ({
  label,
  param,
  placeholder,
  options,
  disabled = false
}: DataTableFilterSelectProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [value, setValue] = useState<string | undefined>(undefined);

  const handleSortChange = (value: string) => {
    searchParams.set(param, value);
    navigate({ search: searchParams.toString() }, { replace: true });
  };

  useEffect(() => {
    const current = searchParams.get(param);
    if (current) {
      setValue(current);
    } else {
      setValue("");
    }
  }, [searchParams, param]);

  return (
    <div className="flex flex-col space-y-1">
      <p className="text-sm text-slate-600">{label}</p>
      <Select
        onValueChange={(value) => {
          handleSortChange(value);
        }}
        value={value}
        disabled={disabled}
      >
        <SelectTrigger>
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
