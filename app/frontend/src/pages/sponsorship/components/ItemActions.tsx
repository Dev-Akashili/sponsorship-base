import { useContext, useEffect, useRef, useState } from "react";
import { Clock, FlagTriangleRight, Share, Star } from "lucide-react";
import { AuthContext } from "@/context/Auth";
import { addFavourite, removeFavourite } from "@/api/sponsorship";
import { toast } from "react-toastify";
import { DEFAULT_ERROR_MESSAGE } from "@/constants/Messages.constants";
import { AuthInfoModal } from "@/components/core/AuthInfoModal";
import { Button } from "@/components/ui/button";

interface ItemActionProps {
  id: string;
  isOwner: boolean;
  isFavourite: boolean;
  favouriteCount: number;
  isApproved: boolean;
}

export const ItemActions = ({
  id,
  isOwner,
  isFavourite,
  favouriteCount,
  isApproved
}: ItemActionProps) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [isFav, setIsFav] = useState<boolean>(false);
  const [favCount, setFavCount] = useState<number>(0);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsFav(isFavourite);
    setFavCount(favouriteCount);
  }, [isFavourite, favouriteCount]);

  const handleFavouriteChange = async () => {
    if (!isAuthenticated) {
      btnRef.current?.click();
      return;
    }

    try {
      if (!isFav) {
        await addFavourite(id);
        setIsFav(true);
        setFavCount((prevState) => (prevState < 1 ? prevState + 1 : prevState));
        toast.success("Added to favourites");
      } else {
        const response = await removeFavourite(id);
        if (response.ok) {
          setIsFav(false);
          setFavCount((prevState) => prevState - 1);
          toast.success("Removed from favourites");
        } else {
          toast.error(DEFAULT_ERROR_MESSAGE);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(DEFAULT_ERROR_MESSAGE);
    }
  };

  return (
    <>
      <AuthInfoModal>
        <Button ref={btnRef} className="hidden"></Button>
      </AuthInfoModal>
      {isApproved ? (
        <div className="flex space-x-1">
          <div className="flex">
            {favCount > 0 && (
              <p className="text-sm text-slate-500 my-auto">{favCount}</p>
            )}
            <Star
              onClick={handleFavouriteChange}
              className={`size-6 p-1 text-slate-500 hover:cursor-pointer hover:bg-slate-300 hover:rounded ${
                isFav ? "text-yellow-400" : ""
              }`}
            />
          </div>
          <Share className="ize-6 p-1 text-slate-500 hover:cursor-pointer hover:bg-slate-300 hover:rounded" />
          {!isOwner && (
            <FlagTriangleRight className="ize-6 p-1 text-slate-500 hover:cursor-pointer hover:bg-slate-300 hover:rounded" />
          )}
        </div>
      ) : (
        <div className="flex justify-center items-center space-x-1 text-slate-500 italic">
          <Clock className="size-4" />
          <p className="text-xs">Pending approval</p>
        </div>
      )}
    </>
  );
};
