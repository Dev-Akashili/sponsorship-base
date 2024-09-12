import { getUserFavouriteSponsorships } from "@/api/sponsorship";
import { useQueryParams } from "@/helpers/hooks/useQueryParams";
import { PaginatedResponse } from "@/types";
import { Sponsorship } from "@/types/sponsorship";
import { useEffect, useState } from "react";
import { Table } from "./components/Table";

export const Favourite = () => {
  const [data, setData] = useState<PaginatedResponse<Sponsorship> | undefined>(
    undefined
  );
  const defaultParams = {
    pageNumber: 1,
    pageSize: 10
  };
  const query = useQueryParams(defaultParams);

  useEffect(() => {
    const getData = async () => {
      const sponsorships = await getUserFavouriteSponsorships(query);
      setData(sponsorships);
    };
    getData();
  }, [query]);

  return <Table pageTitle={"Manage contribution"} data={data} />;
};
