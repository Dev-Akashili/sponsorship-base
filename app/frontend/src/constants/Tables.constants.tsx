import {
  EXPERIENCE,
  SEX,
  INDUSTRIES,
  COUNTRIES_AND_CITIES
} from "./Forms.constants";
import { FilterSelectProps } from "@/pages/sponsorship/components/filter";

export const PROFILE_COLUMN = [
  {
    name: "Sex",
    image: "sex"
  },
  {
    name: "Nationality",
    image: "passport"
  },
  {
    name: "Education",
    image: "education"
  },
  {
    name: "Place of Education",
    image: "certificate"
  }
];

export const COMPANY_COLUMN = [
  {
    name: "Company",
    image: "company"
  },
  {
    name: "Location",
    image: "location"
  },
  {
    name: "Job Title",
    image: "suitcase"
  },
  {
    name: "Job Level",
    image: "level"
  },
  {
    name: "Salary",
    image: "money"
  }
];

export const SPONSORSHIP_COLUMN = [
  {
    name: "Date of Sponsorship",
    image: "calendar"
  },
  {
    name: "Job Board Website",
    image: "website"
  }
];

export const SPONSORSHIP_TABLE_FILTER_OPTIONS: FilterSelectProps[] = [
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
