interface Errors {
  [key: string]: string[];
}

export const getResponseErrors = (errors: Errors): string[] => {
  const result: string[] = [];
  for (const errorKey in errors) {
    errors[errorKey].forEach((error) => {
      result.push(error);
    });
  }
  return result;
};

export const formatPageTitle = (pageTitle: string) => {
  return pageTitle
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter
    .join(" ");
};

export const convertToSlug = (str: string) => {
  return str.toLowerCase().replace(/\s+/g, "-");
};
