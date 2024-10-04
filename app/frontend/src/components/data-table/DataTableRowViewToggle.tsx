import { Button } from "@/components/ui/button";
import { ToggleContext } from "@/context/Toggle";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const DataTableRowViewToggle = ({ toggleId }: { toggleId: string }) => {
  const { expanded, toggleExpanded } = useContext(ToggleContext);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (id && !expanded.includes(id)) {
      toggleExpanded(id);
    }
  }, [searchParams, toggleExpanded]);

  return (
    <Button
      size={"icon"}
      variant={"ghost"}
      className={`hover:text-blue-600 ${id ? "hidden" : ""}`}
      onClick={() => toggleExpanded(toggleId)}
    >
      {expanded.includes(toggleId) ? <ChevronUp /> : <ChevronDown />}
    </Button>
  );
};
