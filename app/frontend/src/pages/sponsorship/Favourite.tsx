import { getUserFavouriteSponsorships } from "@/api/sponsorship";
import { useQueryParams } from "@/helpers/hooks/useQueryParams";
import { PaginatedResponse } from "@/types";
import { Sponsorship } from "@/types/sponsorship";
import { useEffect, useState } from "react";
import { Table } from "./components/Table";
import { NoContent } from "../error/NoContent";
import { ROUTES } from "../routes";

export const Favourite = () => {
  const [fetchCount, setFetchCount] = useState<number>(0);
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
      if (sponsorships.count > 0) {
        setFetchCount((prevState) => prevState + 1);
      }
      setData(sponsorships);
    };
    getData();
  }, [query]);

  return (
    <Table
      pageTitle={"Manage contribution"}
      data={data}
      fetchCount={fetchCount}
      noContentPage={
        <NoContent
          image={"fishing"}
          text="To add some favourites please click"
          link={ROUTES.list}
        />
      }
    />
  );
};
