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
        <div className="flex space-x-2 mt-auto mb-8">
          <Edit
            onClick={() => navigate(`${ROUTES.edit}/?id=${id}`)}
            className="ize-6 p-1 text-slate-500 hover:text-blue-600 hover:cursor-pointer hover:bg-slate-200 hover:rounded"
          />

          <DeleteModal
            text={"this"}
            handleDelete={handleDelete}
            deleting={deleting}
          >
            <Trash className="size-6 p-1 text-slate-500 hover:text-red-500 hover:cursor-pointer hover:bg-slate-200 hover:rounded" />
          </DeleteModal>
          {user?.roles.includes(ROLES.Admin) ? (
            loading ? (
              <Spinner size="sm" />
            ) : isApproved ? (
              <Ban
                onClick={handleApprove}
                className="size-6 p-1 text-slate-500 hover:text-orange-500 hover:text-red-500 hover:cursor-pointer hover:bg-slate-200 hover:rounded"
              />
            ) : (
              <CircleCheck
                onClick={handleApprove}
                className="size-6 p-1 text-slate-500 hover:text-green-500 hover:cursor-pointer hover:bg-slate-200 hover:rounded"
              />
            )
          ) : null}
        </div>
      )}
    </>
  );
};
