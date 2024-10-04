import { createContext, useState } from "react";

type ToggleContextValue = {
  expanded: string[];
  toggleExpanded: (id: string) => void;
};

const ToggleContext = createContext<ToggleContextValue>({
  expanded: [],
  toggleExpanded: () => {}
});

interface ToggleProviderProps {
  children: JSX.Element | JSX.Element[];
}

const ToggleProvider = ({ children }: ToggleProviderProps) => {
  const [expanded, setExpanded] = useState<string[]>([]);

  const toggleExpanded = (id: string) => {
    setExpanded((prevExpanded) =>
      prevExpanded.includes(id)
        ? prevExpanded.filter((expandedId) => expandedId !== id)
        : [...prevExpanded, id]
    );
  };

  return (
    <ToggleContext.Provider value={{ expanded, toggleExpanded }}>
      {children}
    </ToggleContext.Provider>
  );
};

export { ToggleContext, ToggleProvider };
