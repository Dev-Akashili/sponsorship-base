import { useState, useEffect, ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Input } from "../ui/input";

interface DataTableFilterProps {
  placeholder: string;
  options?: ReactNode | ReactNode[];
}

export const DataTableFilter = ({
  placeholder,
  options
}: DataTableFilterProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    const searchParams = new URLSearchParams(location.search);
    if (value) {
      searchParams.set("filter", value);
    } else {
      searchParams.delete("filter");
    }
    navigate({ search: searchParams.toString() }, { replace: true });
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const filterValue = searchParams.get("filter") || "";
    setInputValue(filterValue);
  }, [location.search]);

  return (
    <div className="flex justify-between w-full">
      <div className="w-[49%] h-full">
        <Input
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
      <div className="w-[49%] text-right my-auto">{options}</div>
    </div>
  );
};
