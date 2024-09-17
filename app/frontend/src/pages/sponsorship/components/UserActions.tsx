import { useContext, useState } from "react";
import { Edit, Trash } from "lucide-react";
import { AuthContext } from "@/context/Auth";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/pages/routes";
import { deleteSponsorship } from "@/api/sponsorship";
import { toast } from "react-toastify";
import { DEFAULT_ERROR_MESSAGE } from "@/constants/Messages.constants";
import { DeleteModal } from "@/components/core/DeleteModal";

interface UserActionsProps {
  id: string;
  isOwner: boolean;
}

export const UserActions = ({ id = "", isOwner }: UserActionsProps) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [deleting, setDeleting] = useState<boolean>(false);

  const handleDelete = async () => {
    setDeleting(true);

    try {
      const response = await deleteSponsorship(id);
      if (response.ok) {
        navigate(0);
        toast.success("Successfully deleted.");
      } else {
        toast.error(DEFAULT_ERROR_MESSAGE);
      }
    } catch (error) {
      console.error(error);
      toast.error(DEFAULT_ERROR_MESSAGE);
    }

    setDeleting(false);
  };

  return (
    <>
      {(isOwner || user?.roles.includes("Admin")) && (
        <div className="flex space-x-2 mt-4 h-5">
          <div
            onClick={() => navigate(`${ROUTES.edit}/?id=${id}`)}
            className="flex space-x-2 justify-center items-center py-1 px-2 rounded sponsorship-base text-white hover:cursor-pointer"
          >
            <Edit className="size-3" /> <p className="text-[9px]">Edit</p>
          </div>
          <DeleteModal
            text={"this"}
            handleDelete={handleDelete}
            deleting={deleting}
          >
            <div className="flex space-x-2 justify-center items-center py-1 px-2 rounded bg-red-500 hover:bg-red-400 text-white hover:cursor-pointer">
              <Trash className="size-3" /> <p className="text-[9px]">Delete</p>
            </div>
          </DeleteModal>
        </div>
      )}
    </>
  );
};
