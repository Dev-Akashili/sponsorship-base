import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import { Search } from "lucide-react";

interface DataTableFilterProps {
  placeholder: string;
  actions: JSX.Element | JSX.Element[];
}

export const DataTableFilter = ({
  placeholder,
  actions
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
    <div className="flex justify-between w-[70%]">
      <div className="w-[78%] h-full relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="w-5 h-5 text-slate-500" />
        </span>
        <Input
          className="pl-10"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
      {actions}
    </div>
  );
};
