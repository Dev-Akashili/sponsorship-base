import { LoadingPage } from "@/components/core/Loader";
import { PageTitle } from "@/components/core/PageTitle";
import { DataTable } from "@/components/data-table";
import { PaginatedResponse } from "@/types";
import { columns } from "./columns";
import { DataTableFilter } from "@/components/data-table/DataTableFilter";
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
import { ToggleProvider } from "@/context/Toggle";
import { QueryProvider } from "@/context/Query";
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
        className="text-blue-600 hover:text-blue-500 border-blue-600 w-[18%]"
      >
        <SlidersHorizontal className="mr-1" /> Filters
      </Button>
    </FilterPanel>
  );
  const filter = (
    <DataTableFilter
      actions={filterPanel}
      placeholder={"Search by company, country, city, job title..."}
    />
  );

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
    <div className="flex space-x-2 mb-4 ml-auto">
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
    <ToggleProvider>
      <QueryProvider>
        <PageTitle title={pageTitle} />
        {!data ? (
          <LoadingPage />
        ) : (
          <>
            {data.count <= 0 && fetchCount <= 0 ? (
              noContentPage ?? <></>
            ) : (
              <div className="h-full flex flex-col justify-center items-center my-40">
                <DataTable
                  columns={columns}
                  count={data.count}
                  data={data.list}
                  Filter={filter}
                  actions={tableAction}
                  adminOptions={
                    user?.roles.includes(ROLES.Admin) ? adminOption : null
                  }
                  link={ROUTES.list}
                />
              </div>
            )}
          </>
        )}
      </QueryProvider>
    </ToggleProvider>
  );
}
