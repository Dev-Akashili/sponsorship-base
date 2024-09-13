import { useContext } from "react";
import { Edit, Trash } from "lucide-react";
import { AuthContext } from "@/context/Auth";
import { DeleteModal } from ".";

interface UserActionsProps {
  id: string;
  isOwner: boolean;
}

export const UserActions = ({ id = "", isOwner }: UserActionsProps) => {
  const { user } = useContext(AuthContext);

  return (
    <>
      {(isOwner || user?.roles.includes("Admin")) && (
        <div className="flex space-x-2 mt-4 h-5">
          <div className="flex space-x-2 justify-center items-center py-1 px-2 rounded sponsorship-base text-white hover:cursor-pointer">
            <Edit className="size-3" /> <p className="text-[9px]">Edit</p>
          </div>
          <DeleteModal id={id}>
            <div className="flex space-x-2 justify-center items-center py-1 px-2 rounded bg-red-500 hover:bg-red-400 text-white hover:cursor-pointer">
              <Trash className="size-3" /> <p className="text-[9px]">Delete</p>
            </div>
          </DeleteModal>
        </div>
      )}
    </>
  );
};
