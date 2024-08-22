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
