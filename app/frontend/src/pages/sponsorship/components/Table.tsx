import { LoadingPage } from "@/components/core/Loader";
import { PageTitle } from "@/components/core/PageTitle";
import { DataTable } from "@/components/data-table";
import { PaginatedResponse } from "@/types";
import { columns } from "./columns";
import { DataTableSearch } from "@/components/data-table/DataTableSearch";
import { Button } from "@/components/ui/button";
import { CopyPlus, SlidersHorizontal } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ROUTES } from "../../routes";
import { Sponsorship } from "@/types/sponsorship";
import { useContext } from "react";
import { AuthContext } from "@/context/Auth";
import { AuthInfoModal } from "@/components/core/AuthInfoModal";
import { Checkbox } from "@/components/ui/checkbox";
import { ROLES } from "@/constants/Auth.constants";
import { SPONSORSHIP_TABLE_FILTER_OPTIONS } from "@/constants/Tables.constants";
import { FilterPanel } from "./filter";

interface TableProps {
  data: PaginatedResponse<Sponsorship> | undefined;
  pageTitle: string;
  fetchCount?: number;
  noContentPage?: JSX.Element;
  path: string;
}

export function Table({
  data,
  pageTitle,
  fetchCount = 0,
  noContentPage,
  path
}: TableProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, isAuthenticated } = useContext(AuthContext);

  const filterPanel = (
    <FilterPanel path={path} options={SPONSORSHIP_TABLE_FILTER_OPTIONS}>
      <Button
        variant={"outline"}
        className="text-blue-600 hover:text-blue-500 dark:text-white border-blue-600 dark:border-white w-28 m-2"
      >
        <SlidersHorizontal className="mr-1" /> Filters
      </Button>
    </FilterPanel>
  );

  const search = (
    <DataTableSearch
      placeholder={"Search by company, country, city, job title..."}
    />
  );

  const tableAction = isAuthenticated ? (
    <Link to={ROUTES.add}>
      <Button
        className="sponsorship-base dark:bg-blue-800 dark:hover:bg-blue-700 dark:text-white h-[40px] w-48 m-2"
        size={"sm"}
      >
        <CopyPlus className="size-4 mr-2" /> Add a contribution
      </Button>
    </Link>
  ) : (
    <AuthInfoModal>
      <Button
        className="sponsorship-base dark:bg-blue-800 dark:hover:bg-blue-700 dark:text-white h-[40px] w-48 m-2"
        size={"sm"}
      >
        <CopyPlus className="size-4 mr-2" /> Add a contribution
      </Button>
    </AuthInfoModal>
  );

  const handleApprovalCheckChange = (checked: boolean | string) => {
    if (checked) {
      searchParams.set("approval", "show".toString());
    } else {
      searchParams.set("approval", "hide".toString());
    }
    navigate({ search: searchParams.toString() }, { replace: true });
  };

  const handleReportedCheckChange = (reported: boolean | string) => {
    if (reported) {
      searchParams.set("reported", "show".toString());
    } else {
      searchParams.set("reported", "hide".toString());
    }
    navigate({ search: searchParams.toString() }, { replace: true });
  };

  const adminOption = (
    <div className="flex space-x-2 mb-4 ml-auto mr-2">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="approval"
          onCheckedChange={(checked) => handleApprovalCheckChange(checked)}
        />
        <label htmlFor="approval" className="text-sm font-medium">
          Approval
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="reported"
          onCheckedChange={(reported) => handleReportedCheckChange(reported)}
        />
        <label htmlFor="reported" className="text-sm font-medium">
          Reported
        </label>
      </div>
    </div>
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
            <div className="flex flex-col justify-center items-center mt-20 mb-52">
              <DataTable
                columns={columns}
                count={data.count}
                data={data.list}
                Search={search}
                Filter={filterPanel}
                actions={tableAction}
                adminOptions={
                  user?.roles.includes(ROLES.Admin) ? adminOption : null
                }
                link={ROUTES.list}
                paginated
              />
            </div>
          )}
        </>
      )}
    </>
  );
}
