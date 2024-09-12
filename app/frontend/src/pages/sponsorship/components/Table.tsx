import { LoadingPage } from "@/components/core/Loader";
import { PageTitle } from "@/components/core/PageTitle";
import { DataTable } from "@/components/data-table";
import { PaginatedResponse } from "@/types";
import { columns } from "./columns";
import { DataTableFilter } from "@/components/data-table/DataTableFilter";
import { Button } from "@/components/ui/button";
import { CopyPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../routes";
import { Sponsorship } from "@/types/sponsorship";

interface TableProps {
  data: PaginatedResponse<Sponsorship> | undefined;
  pageTitle: string;
}

export function Table({ data, pageTitle }: TableProps) {
  const filter = (
    <DataTableFilter
      placeholder={"Search by company, city..."}
      options={options}
    />
  );

  return (
    <>
      <PageTitle title={pageTitle} />
      {!data ? (
        <LoadingPage />
      ) : (
        <div className="h-full flex justify-center items-center my-40">
          <DataTable
            columns={columns}
            count={data.count}
            data={data.list}
            Filter={filter}
          />
        </div>
      )}
    </>
  );
}

const options = (
  <Link to={ROUTES.contribute}>
    <Button className="sponsorship-base my-auto" size={"sm"}>
      <CopyPlus className="h-4 w-4 mr-2" /> Add a contribution
    </Button>
  </Link>
);
