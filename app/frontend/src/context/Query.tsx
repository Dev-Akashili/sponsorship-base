import { createContext, useState, useEffect } from "react";

interface QueryContextValue {
  query: string;
  updateQuery: (param: string, value: string) => void;
  resetQuery: () => void;
}

const QueryContext = createContext<QueryContextValue>({
  query: "",
  updateQuery: () => {},
  resetQuery: () => {}
});

const QueryProvider = ({
  children
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [query, setQuery] = useState("");

  const updateQuery = (param: string, value: string) => {
    const paramsArray = query.split("&").filter(Boolean);

    const paramsObj: Record<string, string> = paramsArray.reduce(
      (acc: Record<string, string>, paramString) => {
        const [key, val] = paramString.split("=");
        acc[key] = val;
        return acc;
      },
      {}
    );

    paramsObj[param] = value;

    const newQuery = Object.entries(paramsObj)
      .map(([key, val]) => `${key}=${val}`)
      .join("&");

    setQuery(newQuery);
  };

  const resetQuery = () => setQuery("");

  useEffect(() => {
    const initialQuery = window.location.search.substring(1);
    setQuery(initialQuery);
  }, []);

  return (
    <QueryContext.Provider value={{ query, updateQuery, resetQuery }}>
      {children}
    </QueryContext.Provider>
  );
};

export { QueryContext, QueryProvider };
