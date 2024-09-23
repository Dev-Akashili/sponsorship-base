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
import { useContext } from "react";
import { AuthContext } from "@/context/Auth";
import { AuthInfoModal } from "@/components/core/AuthInfoModal";
import { DataTableSorting } from "@/components/data-table/DataTableSorting";

interface TableProps {
  data: PaginatedResponse<Sponsorship> | undefined;
  pageTitle: string;
  fetchCount?: number;
  noContentPage?: JSX.Element;
}

export function Table({
  data,
  pageTitle,
  fetchCount = 0,
  noContentPage
}: TableProps) {
  const { isAuthenticated } = useContext(AuthContext);
  const sortOptions = ["Year", "Salary"];
  const sorting = (
    <DataTableSorting options={sortOptions} defaultSort={"year"} />
  );
  const filter = <DataTableFilter placeholder={"Search by company, city..."} />;

  const tableAction = isAuthenticated ? (
    <Link to={ROUTES.add}>
      <Button className="sponsorship-base h-full" size={"sm"}>
        <CopyPlus className="size-4 mr-2" /> Add a contribution
      </Button>
    </Link>
  ) : (
    <AuthInfoModal>
      <Button className="sponsorship-base h-[40px]" size={"sm"}>
        <CopyPlus className="size-4 mr-2" /> Add a contribution
      </Button>
    </AuthInfoModal>
  );

  return (
    <>
      <PageTitle title={pageTitle} />
      {!data ? (
        <LoadingPage />
      ) : (
        <>
          {data.count <= 0 && fetchCount <= 0 ? (
            noContentPage ?? <></>
          ) : (
            <div className="h-full flex justify-center items-center my-40">
              <DataTable
                columns={columns}
                count={data.count}
                data={data.list}
                Filter={filter}
                Sorting={sorting}
                actions={tableAction}
              />
            </div>
          )}
        </>
      )}
    </>
  );
}
