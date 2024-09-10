import { useLocation } from "react-router-dom";

export const useQueryParams = (defaults: { [key: string]: number }): string => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  let formattedParams = "";

  // If no query parameters, apply defaults
  if (!Array.from(queryParams).length) {
    Object.keys(defaults).forEach((key) => {
      formattedParams += `${key}=${defaults[key]}&`;
    });
  } else {
    queryParams.forEach((value, key) => {
      formattedParams += `${key}=${value}&`;
    });
  }

  if (formattedParams.length > 0) {
    formattedParams = formattedParams.slice(0, -1);
  }

  return formattedParams;
};
