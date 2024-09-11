import { ReactNode } from "react";

interface TableDescription {
  name: string;
  icon: ReactNode;
}
export const PROFILE_DESCRIPTION: TableDescription[] = [
  {
    name: "Gender",
    icon: <img src="../../gender.png" alt="gender" className="h-4 w-4" />
  },
  {
    name: "Nationality",
    icon: <img src="../../passport.png" alt="passport" className="h-4 w-4" />
  },
  {
    name: "Education Level",
    icon: <img src="../../education.png" alt="education" className="h-4 w-4 " />
  },
  {
    name: "Country of Qualification",
    icon: <img src="../../map-pin.png" alt="map-pin" className="h-4 w-4 " />
  }
];

export const COMPANY_DESCRIPTION: TableDescription[] = [
  {
    name: "Company Name",
    icon: <img src="../../company.png" alt="company" className="h-4 w-4 " />
  },
  {
    name: "Location",
    icon: <img src="../../flag.png" alt="flag" className="h-4 w-4 " />
  },
  {
    name: "Job Title",
    icon: <img src="../../suitcase.png" alt="suitcase" className="h-4 w-4 " />
  },
  {
    name: "Salary",
    icon: <img src="../../money.png" alt="money" className="h-4 w-4 " />
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
