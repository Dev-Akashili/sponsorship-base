import { ArrowDown, ArrowUp } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../ui/select";
import { useNavigate, useSearchParams } from "react-router-dom";

interface DataTableSortingProps {
  options: string[];
  defaultSort: string;
}

export const DataTableSorting = ({
  options,
  defaultSort
}: DataTableSortingProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleSortChange = (value: string) => {
    searchParams.set("sortBy", value);
    if (!searchParams.get("order")) {
      searchParams.set("order", "asc");
    }
    navigate({ search: searchParams.toString() }, { replace: true });
  };

  const handleOrderChange = (value: string) => {
    searchParams.set("order", value);
    if (!searchParams.get("sortBy")) {
      searchParams.set("sortBy", defaultSort);
    }
    navigate({ search: searchParams.toString() }, { replace: true });
  };

  return (
    <div className="flex justify-between space-x-2 w-[28%]">
      <Select onValueChange={(value) => handleSortChange(value)}>
        <SelectTrigger>
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option.toLowerCase()}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select onValueChange={(value) => handleOrderChange(value)}>
        <SelectTrigger>
          <SelectValue placeholder="Order" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">
            <div className="flex justify-center items-center italic">
              Asc <ArrowUp className="size-4 ml-1" />
            </div>
          </SelectItem>
          <SelectItem value="desc">
            <div className="flex justify-center items-center italic">
              Desc <ArrowDown className="size-4 ml-1" />
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
