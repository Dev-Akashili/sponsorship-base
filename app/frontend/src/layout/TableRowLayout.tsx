import { ToggleContext } from "@/context/Toggle";
import { useContext } from "react";

interface TableRowLayout {
  id: string;
  summary: JSX.Element | JSX.Element[];
  expand: JSX.Element | JSX.Element[];
}
export const TableRowLayout = ({ id, summary, expand }: TableRowLayout) => {
  const { expanded } = useContext(ToggleContext);

  return <>{expanded.includes(id) ? <>{expand}</> : <>{summary}</>}</>;
};
