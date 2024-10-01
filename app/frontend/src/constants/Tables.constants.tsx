import { DataTableFilterSelectProps } from "@/components/data-table/DataTableFilterSelect";
import { ReactNode } from "react";
import {
  EXPERIENCE,
  SEX,
  INDUSTRIES,
  COUNTRIES_AND_CITIES
} from "./Forms.constants";

interface TableDescription {
  name: string;
  icon: ReactNode;
}
export const PROFILE_DESCRIPTION: TableDescription[] = [
  {
    name: "Sex",
    icon: <img src="../../sex.png" alt="sex" className="h-4 w-4" />
  },
  {
    name: "Nationality",
    icon: <img src="../../passport.png" alt="passport" className="h-4 w-4" />
  },
  {
    name: "Education",
    icon: <img src="../../education.png" alt="education" className="h-4 w-4 " />
  },
  {
    name: "Place of Education",
    icon: (
      <img src="../../certificate.png" alt="certificate" className="h-4 w-4 " />
    )
  }
];

export const COMPANY_DESCRIPTION: TableDescription[] = [
  {
    name: "Job Title",
    icon: <img src="../../suitcase.png" alt="suitcase" className="h-4 w-4 " />
  },
  {
    name: "Job Level",
    icon: <img src="../../level.png" alt="level" className="h-4 w-4 " />
  },
  {
    name: "Salary",
    icon: <img src="../../money.png" alt="money" className="h-4 w-4 " />
  },
  {
    name: "Location",
    icon: <img src="../../flag.png" alt="flag" className="h-4 w-4 " />
  }
];

export const SPONSORSHIP_DETAILS_DESCRIPTION: TableDescription[] = [
  {
    name: "Date of Sponsorship",
    icon: <img src="../../calendar.png" alt="calendar" className="h-4 w-4 " />
  },
  {
    name: "Job Board Website",
    icon: <img src="../../website.png" alt="website" className="h-4 w-4 " />
  }
];

export const SPONSORSHIP_TABLE_FILTER_OPTIONS: DataTableFilterSelectProps[] = [
  {
    label: "Sort By",
    param: "sortBy",
    options: ["Year", "Salary", "Date", "None"]
  },
  {
    label: "Order",
    param: "order",
    options: ["asc", "desc"]
  },
  {
    label: "Country",
    param: "country",
    options: COUNTRIES_AND_CITIES.map((item) => item.country)
  },
  {
    label: "City",
    param: "city",
    options: []
  },
  {
    label: "Experience",
    param: "experience",
    options: EXPERIENCE
  },
  {
    label: "Industry",
    param: "industry",
    options: INDUSTRIES
  },
  { label: "Sex", param: "sex", options: SEX }
];
