import { ReactNode } from "react";

export interface InfoTileProps {
  icon: ReactNode;
  name: ReactNode | string;
}

export const InfoTile = ({ icon, name }: InfoTileProps) => {
  return (
    <div className="flex items-center space-x-1 text-slate-500">
      {icon}
      <p className="text-xs">{name}</p>
    </div>
  );
};
