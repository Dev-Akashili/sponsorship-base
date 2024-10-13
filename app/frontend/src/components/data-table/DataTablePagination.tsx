import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";

interface DataTablePaginationProps {
  count: number;
}

export const DataTablePagination = ({ count }: DataTablePaginationProps) => {
  const defaultPageSize = 10;
  const pageSizeOptions = [10, 20, 30, 40, 50];
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("pageNumber") ?? "1");
  const pageSize = Number(searchParams.get("pageSize") ?? defaultPageSize);
  const numberOfPages = Math.max(Math.ceil(count / pageSize), 1);

  if (currentPage === 0 || pageSize === 0) {
    searchParams.set("pageNumber", "1");
    searchParams.set("pageSize", defaultPageSize.toString());
    navigate({ search: searchParams.toString() }, { replace: true });
  }

  if (currentPage > numberOfPages) {
    searchParams.set("pageNumber", Math.ceil(count / pageSize).toString());
    navigate({ search: searchParams.toString() }, { replace: true });
  }

  const changePageSize = (size: number) => {
    searchParams.set("pageSize", size.toString());
    navigate({ search: searchParams.toString() }, { replace: true });
  };

  const navigateToPage = (param: number) => {
    searchParams.set("pageNumber", param.toString());
    navigate({ search: searchParams.toString() }, { replace: true });
  };

  const canNotGoToPreviousPage = (): boolean => {
    return currentPage === 1 || count < pageSize;
  };

  const canNotGoToNextPage = (): boolean => currentPage >= numberOfPages;

  return (
    <div className="flex w-full flex-col-reverse items-center justify-end gap-4 overflow-auto p-1 sm:flex-row sm:gap-8">
      <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
        <div className="flex items-center space-x-2">
          <p className="whitespace-nowrap text-sm font-medium">
            Items per page
          </p>
          <Select
            onValueChange={(value) => {
              changePageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[4.5rem]">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-center text-sm font-medium">
          Page {currentPage} of {numberOfPages}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            aria-label="Go to first page"
            className="sponsorship-base size-8 p-0 flex dark:bg-blue-800 dark:hover:bg-blue-700 dark:text-white"
            onClick={() => navigateToPage(1)}
            disabled={canNotGoToPreviousPage()}
          >
            <ChevronsLeft className="size-4" aria-hidden="true" />
          </Button>
          <Button
            aria-label="Go to previous page"
            className="sponsorship-base size-8 p-0 flex dark:bg-blue-800 dark:hover:bg-blue-700 dark:text-white"
            onClick={() => navigateToPage(currentPage - 1)}
            disabled={canNotGoToPreviousPage()}
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
          </Button>
          <Button
            aria-label="Go to next page"
            className="sponsorship-base size-8 p-0 flex dark:bg-blue-800 dark:hover:bg-blue-700 dark:text-white"
            onClick={() => navigateToPage(currentPage + 1)}
            disabled={canNotGoToNextPage()}
          >
            <ChevronRight className="size-4" aria-hidden="true" />
          </Button>
          <Button
            aria-label="Go to last page"
            className="sponsorship-base size-8 p-0 flex dark:bg-blue-800 dark:hover:bg-blue-700 dark:text-white"
            onClick={() => navigateToPage(numberOfPages)}
            disabled={canNotGoToNextPage()}
          >
            <ChevronsRight className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  );
};
