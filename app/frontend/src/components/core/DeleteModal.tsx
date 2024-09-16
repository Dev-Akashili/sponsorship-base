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
import { Spinner } from "@/components/core/Loader";
import { DEFAULT_DELETE_QUESTION } from "@/constants/Messages.constants";

interface DeleteModalProps {
  text: string;
  children: JSX.Element | JSX.Element[];
  handleDelete: () => void;
  deleting: boolean;
}

export const DeleteModal = ({
  text,
  children,
  handleDelete,
  deleting
}: DeleteModalProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {`${DEFAULT_DELETE_QUESTION} ${text}`}
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
            disabled={deleting}
          >
            {deleting ? <Spinner size={"sm"} /> : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
