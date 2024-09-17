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
