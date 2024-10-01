import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "../ui/sheet";
import {
  DataTableFilterSelect,
  DataTableFilterSelectProps
} from "./DataTableFilterSelect";
import { Button } from "../ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ROUTES } from "@/pages/routes";
import { ScrollArea } from "../ui/scroll-area";
import React, { useEffect, useState } from "react";
import { COUNTRIES_AND_CITIES } from "@/constants/Forms.constants";

interface DataTableFilterPanelProps {
  children: JSX.Element;
  options: DataTableFilterSelectProps[];
}

export const DataTableFilterPanel = ({
  children,
  options
}: DataTableFilterPanelProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const country = searchParams.get("country");
  const [city, setCity] = useState<string[]>([]);

  useEffect(() => {
    if (country) {
      setCity(
        COUNTRIES_AND_CITIES.find(
          (item) => item.country.toLocaleLowerCase() === country
        )?.cities ?? []
      );
    }
  }, [country]);

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="w-[280px]">
        <SheetHeader>
          <SheetTitle className="text-blue-600">Filters</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[70vh] mt-8 rounded-md border border-slate-400">
          <div className="flex flex-col space-y-4 p-4">
            {options.map((item) => (
              <React.Fragment key={item.label}>
                {item.label !== "City" ? (
                  <DataTableFilterSelect
                    label={item.label}
                    param={item.param}
                    options={item.options}
                  />
                ) : (
                  <DataTableFilterSelect
                    label={item.label}
                    param={item.param}
                    options={city}
                    disabled={city.length <= 0}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </ScrollArea>
        <Button
          onClick={() => navigate(ROUTES.list)}
          variant={"outline"}
          className="mt-8 text-blue-600 hover:text-blue-500 border-blue-600"
        >
          Reset filters
        </Button>
      </SheetContent>
    </Sheet>
  );
};
