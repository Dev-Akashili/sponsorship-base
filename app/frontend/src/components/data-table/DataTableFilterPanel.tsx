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
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/pages/routes";
import { ScrollArea } from "../ui/scroll-area";
import React, { useContext, useEffect, useState } from "react";
import { COUNTRIES_AND_CITIES } from "@/constants/Forms.constants";
import { QueryContext } from "@/context/Query";

interface DataTableFilterPanelProps {
  children: JSX.Element;
  options: DataTableFilterSelectProps[];
}

export const DataTableFilterPanel = ({
  children,
  options
}: DataTableFilterPanelProps) => {
  const navigate = useNavigate();
  const [city, setCity] = useState<string[]>([]);
  const { query, resetQuery } = useContext(QueryContext);

  const getCountryFromQuery = (query: string) => {
    const params = new URLSearchParams(query);
    return params.get("country");
  };

  useEffect(() => {
    const country = getCountryFromQuery(query);

    if (country) {
      setCity(
        COUNTRIES_AND_CITIES.find(
          (item) =>
            item.country.toLocaleLowerCase() === country.toLocaleLowerCase()
        )?.cities ?? []
      );
    } else {
      setCity([]);
    }
  }, [query]);

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="w-[280px]">
        <SheetHeader>
          <SheetTitle className="text-blue-600">Filters</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[65vh] mt-8 rounded-md border border-slate-400">
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
        <div className="flex flex-col mt-8 space-y-2">
          <Button
            onClick={() => navigate(`${ROUTES.list}?${query}`)}
            variant={"outline"}
            className="text-blue-600 hover:text-blue-500 border-blue-600"
          >
            Apply filters
          </Button>
          <Button
            onClick={() => {
              resetQuery();
              navigate(ROUTES.list);
            }}
            variant={"outline"}
            className="text-blue-600 hover:text-blue-500 border-blue-600"
          >
            Reset filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
