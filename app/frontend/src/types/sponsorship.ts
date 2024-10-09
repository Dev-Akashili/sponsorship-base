export interface Sponsorship {
  id: string;
  sex: string;
  nationality: string;
  company?: Company;
  country: string;
  city: string;
  industry: string;
  jobTitle: string;
  experience: string;
  salary: string;
  currency: string;
  education: string;
  countryOfQualification: string;
  month: string;
  year: string;
  jobBoard?: JobBoard;
  isOwner?: boolean;
  isFavourite?: boolean;
  favouriteCount?: number;
  reports?: string[];
  isApproved: boolean;
  createdAt: Date
}

export interface Company {
  name: string;
  logo: string;
  careerPage: string;
}

export interface JobBoard {
  name: string;
  link: string;
}

export interface AddOrEditSponsorship {
  company: string;
  country: string;
  city: string;
  industry: string;
  jobTitle: string;
  experience: string;
  salary: string;
  currency: string;
  education: string;
  countryOfQualification: string;
  month: string;
  year: string;
  jobBoard: string;
  newJobBoardName: string;
  newJobBoardLink: string;
}

export interface AddReport {
  message: string;
}
