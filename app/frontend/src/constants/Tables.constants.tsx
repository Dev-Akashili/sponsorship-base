import {
  EXPERIENCE,
  SEX,
  INDUSTRIES,
  COUNTRIES_AND_CITIES
} from "./Forms.constants";
import {
  FaPoundSign,
  FaRegBuilding,
  FaSuitcase,
  FaPassport,
  FaGraduationCap,
  FaRegCalendarAlt,
  FaGlobe
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { GrUserWorker } from "react-icons/gr";
import { PiCertificateBold, PiGenderIntersexBold } from "react-icons/pi";
import { FilterSelectProps } from "@/pages/sponsorship/components/filter";

export const PROFILE_COLUMN = [
  {
    name: "Sex",
    image: <PiGenderIntersexBold />
  },
  {
    name: "Nationality",
    image: <FaPassport />
  },
  {
    name: "Education",
    image: <FaGraduationCap />
  },
  {
    name: "Place of Education",
    image: <PiCertificateBold />
  }
];

export const COMPANY_COLUMN = [
  {
    name: "Company",
    image: <FaRegBuilding />
  },
  {
    name: "Location",
    image: <FaLocationDot />
  },
  {
    name: "Job Title",
    image: <FaSuitcase />
  },
  {
    name: "Job Level",
    image: <GrUserWorker />
  },
  {
    name: "Salary",
    image: <FaPoundSign />
  }
];

export const SPONSORSHIP_COLUMN = [
  {
    name: "Date of Sponsorship",
    image: <FaRegCalendarAlt />
  },
  {
    name: "Job Board Website",
    image: <FaGlobe />
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
