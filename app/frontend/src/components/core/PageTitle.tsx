import { useEffect } from "react";

export const PageTitle = ({ title }: { title: string }) => {
  useEffect(() => {
    document.title = `SponsorshipBase – ${title}`;
  });

  return <div className="hidden"></div>;
};
