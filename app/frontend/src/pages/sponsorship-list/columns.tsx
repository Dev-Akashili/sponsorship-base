import { Sponsorship } from "@/types/sponsorship";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Sponsorship>[] = [
  {
    id: "PROFILE",
    header: () => {
      return <p className="text-blue-600">PROFILE</p>;
    },
    cell: ({ row }) => {
      const city = row.original.city;

      return <p className="text-slate-600">{city}</p>;
    },
    enableHiding: false,
    enableSorting: false
  },
  {
    id: "COMPANY",
    header: () => {
      return <p className="text-blue-600">COMPANY</p>;
    },
    cell: ({ row }) => {
      const company = row.original.company;

      return <p className="text-slate-600">{company.name}</p>;
    },
    enableHiding: false,
    enableSorting: false
  },
  {
    id: "SPONSORSHIP",
    header: () => {
      return <p className="text-blue-600">SPONSORSHIP DETAILS</p>;
    },
    cell: ({ row }) => {
      const country = row.original.country;

      return <p className="text-slate-600">{country}</p>;
    },
    enableHiding: false,
    enableSorting: false
  }
];
