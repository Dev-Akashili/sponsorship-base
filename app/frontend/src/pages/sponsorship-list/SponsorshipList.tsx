import { getSponsorships } from "@/api/sponsorship";
import { LoadingPage } from "@/components/core/Loader";
import { PageTitle } from "@/components/core/PageTitle";
import { DataTable } from "@/components/data-table";
import { useQueryParams } from "@/helpers/hooks/useQueryParams";
import { PageLayout } from "@/layout/PageLayout";
import { PaginatedResponse } from "@/types";
import { Sponsorship } from "@/types/sponsorship";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTableFilter } from "@/components/data-table/DataTableFilter";
import { Button } from "@/components/ui/button";
import { CopyPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "../routes";

export const SponsorshipList = () => {
  const [data, setData] = useState<PaginatedResponse<Sponsorship> | undefined>(
    undefined
  );
  const defaultParams = {
    pageNumber: 1,
    pageSize: 10
  };
  const query = useQueryParams(defaultParams);
  const filter = (
    <DataTableFilter
      placeholder={"Search by company, city..."}
      options={options}
    />
  );

  useEffect(() => {
    const getData = async () => {
      const sponsorships = await getSponsorships(query);
      setData(sponsorships);
    };
    getData();
  }, [query]);

  return (
    <>
      <PageTitle title={"Sponsorship List"} />
      {!data ? (
        <LoadingPage />
      ) : (
        <PageLayout>
          <DataTable
            columns={columns}
            count={data.count}
            data={data.list}
            Filter={filter}
          />
        </PageLayout>
      )}
    </>
  );
};

const options = (
  <Link to={ROUTES.contribute}>
    <Button className="sponsorship-base my-auto" size={"sm"}>
      <CopyPlus className="h-4 w-4 mr-2" /> Add a contribution
    </Button>
  </Link>
);
