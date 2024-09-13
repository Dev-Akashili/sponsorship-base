import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteSponsorship } from "@/api/sponsorship";
import { toast } from "react-toastify";
import { DEFAULT_ERROR_MESSAGE } from "@/constants/Messages.constants";
import { Spinner } from "@/components/core/Loader";

interface DeleteModalProps {
  id: string;
  children: JSX.Element | JSX.Element[];
}

export const DeleteModal = ({ id, children }: DeleteModalProps) => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleDelete = async () => {
    setSubmitting(true);

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

    setSubmitting(false);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action is permanent and cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-400"
            disabled={submitting}
          >
            {submitting ? <Spinner size={"sm"} /> : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
