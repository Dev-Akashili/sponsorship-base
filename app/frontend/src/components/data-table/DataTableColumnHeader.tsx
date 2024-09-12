import React from "react";
import { InfoTile, InfoTileProps } from "../core/InfoTile";

interface DataTableColumnHeaderProps {
  name: string;
  descriptions: InfoTileProps[];
}

export const DataTableColumnHeader = ({
  name,
  descriptions
}: DataTableColumnHeaderProps) => {
  return (
    <div className="flex flex-col justify-between items-center my-4">
      <p className="text-lg font-bold text-blue-600 text-center">{name}</p>
      <div className="flex flex-wrap justify-center items-center space-x-2 w-[200px]">
        {descriptions.map((item, index) => (
          <React.Fragment key={index}>
            <InfoTile icon={item.icon} name={item.name} />
            {index < descriptions.length - 1 && (
              <p className="font-bold mx-1">|</p>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
