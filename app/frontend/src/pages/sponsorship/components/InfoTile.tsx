export interface InfoTileProps {
  name: string;
  item: string | React.ReactNode;
  image: string;
  icon?: string;
}

export const InfoTile = ({ name, item, image, icon }: InfoTileProps) => {
  return (
    <div className="text-center">
      <div className="inline-flex items-center space-x-1 border-b border-black text-slate-600">
        <img
          src={`../../${image}.png`}
          alt={image.toLocaleLowerCase()}
          className="size-4"
        />
        <p className="font-semibold text-[13px]">{name}</p>
      </div>
      <div className="flex space-x-1 justify-center">
        <p className="text-slate-500 text-[13px]">
          {icon ? `${item}, ` : item}
        </p>
        {icon && (
          <img
            src={`../../${icon}.png`}
            alt={icon?.toLocaleLowerCase()}
            className="size-4 mt-auto"
          />
        )}
      </div>
    </div>
  );
};
