export interface Sponsorship {
  id: string;
  gender: string;
  nationality: string;
  company: Company;
  country: string;
  city: string;
  jobTitle: string;
  experience: string;
  salary: string;
  currency: string;
  education: string;
  countryOfQualification: string;
  month: string;
  year: string;
  jobBoard: JobBoard;
  isOwner: boolean
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

export interface AddSponsorship {
  company: string;
  country: string;
  city: string;
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
