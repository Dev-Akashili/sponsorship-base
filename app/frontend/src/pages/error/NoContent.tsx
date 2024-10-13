import { PageLayout } from "@/layout/PageLayout";
import { Link } from "react-router-dom";

interface NoContentProps {
  image: string;
  text: string;
  link: string;
}

export const NoContent = ({ image, text, link }: NoContentProps) => {
  return (
    <PageLayout>
      <div className="flex flex-col space-y-6 items-center mb-24">
        <img src={`../../${image}.png`} alt={image} className="size-30" />
        <p className="text-slate-500 dark:text-white">
          Nothing to see here yet
        </p>
        <p className="text-slate-500 dark:text-white">
          {text}{" "}
          <span className="text-blue-600 underline">
            <Link to={link}>here</Link>
          </span>
        </p>
      </div>
    </PageLayout>
  );
};
