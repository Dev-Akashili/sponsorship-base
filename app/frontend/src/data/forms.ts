export const genders = ["Male", "Female"];

export const experience = [
  "Intern",
  "Junior",
  "Mid-Level",
  "Senior",
  "Manager",
  "Director"
];

export const salaries = [
  "20,000 - 25,000",
  "25,000 - 30,000",
  "30,000 - 35,000",
  "35,000 - 40,000",
  "40,000 - 45,000",
  "45,000 - 50,000",
  "50,000 - 55,000",
  "55,000 - 60,000",
  "60,000 - 65,000",
  "65,000 - 70,000",
  "70,000 - 75,000",
  "75,000 - 80,000",
  "80,000 - 85,000",
  "85,000 - 90,000",
  "90,000 - 95,000",
  "95,000 - 100,000",
  "100,000+"
];

export const currencies = ["GBP", "EUR", "CHF"];

export const education = [
  "High School",
  "Bachelors",
  "Postgraduate Degree",
  "Masters",
  "PHD"
];

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export const years = Array.from(
  { length: new Date().getFullYear() - 1979 },
  (_, i) => (1980 + i).toString()
).reverse();

export const jobBoards = [
  "LinkedIn",
  "Indeed",
  "Reed",
  "Xing",
  "Company website/career page",
  "Other"
];
