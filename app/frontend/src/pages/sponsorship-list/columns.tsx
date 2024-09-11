import {
  COMPANY_DESCRIPTION,
  PROFILE_DESCRIPTION,
  SPONSORSHIP_DETAILS_DESCRIPTION
} from "@/constants/Tables.constants";
import { Sponsorship } from "@/types/sponsorship";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table/DataTableColumnHeader";
import { InfoTile } from "@/components/core/InfoTile";
import { convertToSlug } from "@/utils";
import { ExternalLink, FlagTriangleRight, Share, Star } from "lucide-react";

export const columns: ColumnDef<Sponsorship>[] = [
  {
    id: "PROFILE",
    header: () => (
      <DataTableColumnHeader
        name="PROFILE"
        descriptions={PROFILE_DESCRIPTION}
      />
    ),
    cell: ({ row }) => {
      const { gender, nationality, education, countryOfQualification } =
        row.original;

      const coq =
        countryOfQualification == nationality
          ? "Home country"
          : countryOfQualification;

      const items = [gender, nationality, education, coq];

      return (
        <div className="flex flex-col space-y-2">
          <div className="flex space-x-2">
            {PROFILE_DESCRIPTION.slice(0, 2).map((item, index) => (
              <InfoTile name={items[index]} icon={item.icon} />
            ))}
          </div>
          <div className="flex space-x-2">
            {PROFILE_DESCRIPTION.slice(-2).map((item, index) => (
              <InfoTile
                name={items[index + (items.length - 2)]}
                icon={item.icon}
              />
            ))}
          </div>
        </div>
      );
    },
    enableHiding: false,
    enableSorting: false
  },
  {
    id: "COMPANY",
    header: () => {
      return (
        <DataTableColumnHeader
          name="COMPANY"
          descriptions={COMPANY_DESCRIPTION}
        />
      );
    },
    cell: ({ row }) => {
      const { company, country, city, jobTitle, salary, currency } =
        row.original;
      const companyLogoSlug = convertToSlug(company.name);
      const countryLogoSlug = convertToSlug(country);

      return (
        <div className="flex space-x-2">
          <div className="flex flex-col space-y-2 border-r-2 pr-2">
            <img
              src={`../../${companyLogoSlug}.jpeg`}
              alt={companyLogoSlug}
              className="h-16 w-16"
            />
            <div className="flex space-x-1">
              <p className="text-xs text-slate-500 font-semibold">{city}</p>
              <img
                src={`../../${countryLogoSlug}.png`}
                alt={countryLogoSlug}
                className="h-4 w-4"
              />
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <p className="text-xs font-semibold text-slate-500">
              {company.name}
            </p>
            <InfoTile
              name={jobTitle}
              icon={
                <img
                  src="../../suitcase.png"
                  alt="sitcase"
                  className="h-4 w-4"
                />
              }
            />
            <InfoTile
              name={
                <p>
                  {salary}
                  <span className="ml-1 font-semibold">{currency}</span>
                </p>
              }
              icon={
                <img src="../../money.png" alt="money" className="h-4 w-4" />
              }
            />
          </div>
        </div>
      );
    },
    enableHiding: false,
    enableSorting: false
  },
  {
    id: "SPONSORSHIP",
    header: () => {
      return (
        <DataTableColumnHeader
          name="SPONSORSHIP DETAILS"
          descriptions={SPONSORSHIP_DETAILS_DESCRIPTION}
        />
      );
    },
    cell: ({ row }) => {
      const { month, year, jobBoard } = row.original;
      const jobBoardSlug = convertToSlug(jobBoard.name);

      const website = (
        <a
          href={jobBoard.link}
          target="_blank"
          className="flex text-slate-500 font-semibold underline cursor-pointer"
        >
          {jobBoard.name}
          <ExternalLink className="size-3 my-auto ml-1" />
        </a>
      );

      return (
        <div className="flex flex-col justify-center items-center">
          <div className="space-y-4">
            <div className="space-y-2">
              <InfoTile
                name={`${month}, ${year}`}
                icon={
                  <img
                    src="../../calendar.png"
                    alt="calendar"
                    className="h-4 w-4"
                  />
                }
              />
              <InfoTile
                name={website}
                icon={
                  <img
                    src={`../../${jobBoardSlug}.jpeg`}
                    alt={jobBoardSlug}
                    className="h-4 w-4"
                  />
                }
              />
            </div>
            <div className="flex space-x-1">
              <Star className="size-6 p-1 text-slate-500 hover:cursor-pointer hover:bg-slate-300 hover:rounded" />
              <Share className="ize-6 p-1 text-slate-500 hover:cursor-pointer hover:bg-slate-300 hover:rounded" />
              <FlagTriangleRight className="ize-6 p-1 text-slate-500 hover:cursor-pointer hover:bg-slate-300 hover:rounded" />
            </div>
          </div>
        </div>
      );
    },
    enableHiding: false,
    enableSorting: false
  }
];
