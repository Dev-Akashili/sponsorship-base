import { useContext, useEffect, useState } from "react";
import { Edit, FlagTriangleRight, Share, Star, Trash } from "lucide-react";
import { AuthContext } from "@/context/Auth";
import { addFavourite, removeFavourite } from "@/api/sponsorship";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AUTH_ROUTES } from "@/pages/routes";
import { DEFAULT_ERROR_MESSAGE } from "@/constants/Messages.constants";

export const UserActions = ({ isOwner }: { isOwner: boolean }) => {
  const { user } = useContext(AuthContext);

  return (
    <>
      {(isOwner || user?.roles.includes("Admin")) && (
        <div className="flex space-x-2 mt-4 h-5">
          <div className="flex space-x-2 justify-center items-center py-1 px-2 rounded sponsorship-base text-white hover:cursor-pointer">
            <Edit className="size-3" /> <p className="text-[9px]">Edit</p>
          </div>
          <div className="flex space-x-2 justify-center items-center py-1 px-2 rounded bg-red-500 hover:bg-red-400 text-white hover:cursor-pointer">
            <Trash className="size-3" /> <p className="text-[9px]">Delete</p>
          </div>
        </div>
      )}
    </>
  );
};

interface ItemActionProps {
  id: string;
  isOwner: boolean;
  isFavourite: boolean;
  favouriteCount: number;
}

export const ItemActions = ({
  id,
  isOwner,
  isFavourite,
  favouriteCount
}: ItemActionProps) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const [isFav, setIsFav] = useState<boolean>(false);
  const [favCount, setFavCount] = useState<number>(0);

  useEffect(() => {
    setIsFav(isFavourite);
    setFavCount(favouriteCount);
  }, [isFavourite, favouriteCount]);

  const handleFavouriteChange = async () => {
    if (!isAuthenticated) {
      navigate(AUTH_ROUTES.login);
      return;
    }

    try {
      if (!isFav) {
        await addFavourite(id);
        setIsFav(true);
        setFavCount((prevState) => prevState + 1);
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
  );
};
