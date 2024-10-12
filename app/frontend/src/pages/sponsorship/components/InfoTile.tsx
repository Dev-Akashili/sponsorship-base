export interface InfoTileProps {
  name: string;
  item: string | React.ReactNode;
  image: React.ReactNode;
  icon?: string;
}

export const InfoTile = ({ name, item, image, icon }: InfoTileProps) => {
  return (
    <div className="text-center">
      <div className="inline-flex items-center space-x-1 border-b border-black dark:border-white text-slate-600 dark:text-slate-400">
        {image}
        <p className="font-semibold text-[13px]">{name}</p>
      </div>
      <div className="flex space-x-1 justify-center">
        <p className="text-slate-500 dark:text-white text-[13px]">
          {icon ? `${item}, ` : item}
        </p>
        {icon && (
          <img
            src={`https://img.icons8.com/color/48/${icon}.png`}
            alt={icon?.toLocaleLowerCase()}
            className="size-4 mt-auto"
          />
        )}
      </div>
    </div>
  );
};
