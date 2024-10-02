import { useContext, useState } from "react";
import { Ban, CircleCheck, Edit, Trash } from "lucide-react";
import { AuthContext } from "@/context/Auth";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/pages/routes";
import { approveOrDisable, deleteSponsorship } from "@/api/sponsorship";
import { toast } from "react-toastify";
import { DEFAULT_ERROR_MESSAGE } from "@/constants/Messages.constants";
import { DeleteModal } from "@/components/core/DeleteModal";
import { ROLES } from "@/constants/Auth.constants";
import { Spinner } from "@/components/core/Loader";
import { useMutate } from "@/helpers/hooks/useMutate";

interface UserActionsProps {
  id: string;
  isOwner: boolean;
  isApproved: boolean;
}

export const UserActions = ({
  id = "",
  isOwner,
  isApproved
}: UserActionsProps) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { mutate } = useMutate();
  const [deleting, setDeleting] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    setDeleting(true);

    try {
      const response = await deleteSponsorship(id);
      if (response.ok) {
        mutate();
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

  const handleApprove = async () => {
    setLoading(true);
    try {
      const request = await approveOrDisable(id);
      if (request.ok) {
        mutate();
        toast.success(isApproved ? "Disabled!" : "Approved!");
      } else {
        toast.error(DEFAULT_ERROR_MESSAGE);
      }
    } catch (error) {
      console.error(error);
      toast.error(DEFAULT_ERROR_MESSAGE);
    }
    setLoading(false);
  };

  return (
    <>
      {(isOwner || user?.roles.includes(ROLES.Admin)) && (
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
          {user?.roles.includes(ROLES.Admin) ? (
            loading ? (
              <Spinner size="sm" />
            ) : isApproved ? (
              <div
                onClick={handleApprove}
                className="flex space-x-2 justify-center items-center py-1 px-2 rounded bg-orange-500 hover:bg-orange-400 text-white hover:cursor-pointer"
              >
                <Ban className="size-3" /> <p className="text-[9px]">Disable</p>
              </div>
            ) : (
              <div
                onClick={handleApprove}
                className="flex space-x-2 justify-center items-center py-1 px-2 rounded bg-green-500 hover:bg-green-400 text-white hover:cursor-pointer"
              >
                <CircleCheck className="size-3" />{" "}
                <p className="text-[9px]">Approve</p>
              </div>
            )
          ) : null}
        </div>
      )}
    </>
  );
};
