import {
  COMPANY_COLUMN,
  PROFILE_COLUMN,
  SPONSORSHIP_COLUMN
} from "@/constants/Tables.constants";
import { Sponsorship } from "@/types/sponsorship";
import { ColumnDef } from "@tanstack/react-table";
import { convertToSlug } from "@/utils";
import { ExternalLink } from "lucide-react";
import { UserActions, ItemActions } from ".";
import { DataTableRowViewToggle } from "@/components/data-table/DataTableRowViewToggle";
import { TableRowLayout } from "@/layout/TableRowLayout";
import { FaPassport, FaRegCalendarAlt } from "react-icons/fa";
import { PiGenderIntersexBold } from "react-icons/pi";
import { InfoTile } from ".";

export const columns: ColumnDef<Sponsorship>[] = [
  {
    id: "TOGGLE",
    cell: ({ row }) => {
      const { id } = row.original;

      return <DataTableRowViewToggle toggleId={id} />;
    }
  },
  {
    id: "PROFILE",
    header: () => (
      <p className="text-lg font-bold text-blue-600 text-center">PROFILE</p>
    ),
    cell: ({ row }) => {
      const {
        id,
        sex,
        nationality,
        education,
        countryOfQualification,
        isOwner,
        isApproved,
        createdAt
      } = row.original;

      const coq =
        countryOfQualification == nationality
          ? "Home country"
          : countryOfQualification;

      const items = [sex, nationality, education, coq];

      return (
        <TableRowLayout
          id={id}
          summary={
            <div className="flex flex-col justify-center space-y-3 mx-6">
              <div className="flex space-x-1 items-center">
                <PiGenderIntersexBold />
                <p>{sex}</p>
                <p>|</p>
                <FaPassport />
                <p>{nationality}</p>
              </div>
              <p className="italic text-slate-500 text-[10px]">
                Added: {new Date(createdAt).toLocaleDateString("en-GB")}
              </p>
            </div>
          }
          expand={
            <div className="flex flex-col items-center min-h-96 mt-5">
              <img src="../../profile.png" alt="profile" className="size-16" />
              <div className="flex flex-col items-center space-y-3 mt-8">
                {PROFILE_COLUMN.map((item, index) => (
                  <InfoTile
                    key={index}
                    name={item.name}
                    item={items[index]}
                    image={item.image}
                  />
                ))}
              </div>
              <UserActions
                id={id}
                isOwner={isOwner ?? false}
                isApproved={isApproved}
              />
            </div>
          }
        />
      );
    },
    enableHiding: false,
    enableSorting: false
  },
  {
    id: "COMPANY",
    header: () => {
      return (
        <p className="text-lg font-bold text-blue-600 text-center">COMPANY</p>
      );
    },
    cell: ({ row }) => {
      const {
        id,
        company,
        country,
        city,
        jobTitle,
        experience,
        salary,
        currency
      } = row.original;
      const companyLogoSlug = convertToSlug(company?.name ?? "");
      const countryLogoSlug =
        convertToSlug(country) === "united-kingdom"
          ? "great-britain"
          : convertToSlug(country);

      const items = [
        company?.name,
        city,
        jobTitle,
        experience,
        `${currency} ${salary}`
      ];

      return (
        <TableRowLayout
          id={id}
          summary={
            <div className="flex flex-col space-y-1 items-center">
              <div className="flex space-x-1">
                <div className="flex space-x-1">
                  <img
                    src={`../../${companyLogoSlug}.jpeg`}
                    className="size-5 border"
                  />
                  <p>{company?.name}</p>
                </div>
                <p>|</p>
                <p>{jobTitle}</p>
              </div>
              <div className="flex space-x-1">
                <p>{city},</p>
                <img
                  src={`https://img.icons8.com/color/48/${countryLogoSlug}.png`}
                  className="h-5 w-5"
                />
              </div>
            </div>
          }
          expand={
            <div className="flex flex-col items-center min-h-96 mt-5">
              <img
                src={`../../${companyLogoSlug}.jpeg`}
                alt={companyLogoSlug}
                className="size-16 border"
              />
              <div className="flex flex-col items-center space-y-3 mt-8">
                {COMPANY_COLUMN.map((item, index) => (
                  <InfoTile
                    key={index}
                    name={item.name}
                    item={items[index]}
                    image={item.image}
                    icon={item.name === "Location" ? countryLogoSlug : ""}
                  />
                ))}
              </div>
            </div>
          }
        />
      );
    },
    enableHiding: false,
    enableSorting: false
  },
  {
    id: "SPONSORSHIP",
    header: () => {
      return (
        <p className="text-lg font-bold text-blue-600 text-center">
          SPONSORSHIP
        </p>
      );
    },
    cell: ({ row }) => {
      const {
        id,
        company,
        month,
        year,
        jobBoard,
        isOwner,
        isFavourite,
        favouriteCount,
        isApproved,
        reports
      } = row.original;
      const jobBoardSlug = convertToSlug(jobBoard?.name ?? "");
      const isJobBoardCompanyPage = jobBoard?.name === "Company";

      const careerPage = (
        <a
          href={company?.careerPage}
          target="_blank"
          className="flex text-blue-600 font-semibold underline"
        >
          Click here
          <ExternalLink className="size-3 my-auto ml-1" />
        </a>
      );

      const website = (
        <a
          href={isJobBoardCompanyPage ? company?.careerPage : jobBoard?.link}
          target={"_blank"}
          className={`flex text-slate-600 font-semibold ${
            !isJobBoardCompanyPage && "underline cursor-pointer"
          }`}
        >
          {!isJobBoardCompanyPage && (
            <>
              <img
                src={`../../${jobBoardSlug}.jpeg`}
                alt={`${jobBoardSlug}`}
                className="size-3 my-auto mr-1 border"
              />
              {jobBoard?.name}
              <ExternalLink className="size-3 my-auto ml-1" />
            </>
          )}
          {isJobBoardCompanyPage && "Career page"}
        </a>
      );

      const items = [`${month}, ${year}`, careerPage, website];

      return (
        <TableRowLayout
          id={id}
          summary={
            <div className="flex flex-col space-y-2 mx-6">
              <div className="flex space-x-1">
                <FaRegCalendarAlt className="my-auto" />
                <p>{`${month}, ${year}`}</p>
              </div>
              <ItemActions
                id={id}
                isOwner={isOwner ?? false}
                isFavourite={isFavourite ?? false}
                favouriteCount={favouriteCount ?? 0}
                isApproved={isApproved}
                reports={reports ?? []}
              />
            </div>
          }
          expand={
            <div className="flex flex-col items-center min-h-96 mt-5">
              <img
                src="../../contract.png"
                alt="contract"
                className="size-16"
              />
              <div className="flex flex-col items-center space-y-3 mt-8">
                {SPONSORSHIP_COLUMN.map((item, index) => (
                  <InfoTile
                    key={index}
                    name={item.name}
                    item={items[index]}
                    image={item.image}
                  />
                ))}
              </div>
              <div className="mt-auto mb-8">
                <ItemActions
                  id={id}
                  isOwner={isOwner ?? false}
                  isFavourite={isFavourite ?? false}
                  favouriteCount={favouriteCount ?? 0}
                  isApproved={isApproved}
                  reports={reports ?? []}
                />
              </div>
            </div>
          }
        />
      );
    },
    enableHiding: false,
    enableSorting: false
  }
];
