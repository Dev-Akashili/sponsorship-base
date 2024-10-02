import { useContext, useEffect, useRef, useState } from "react";
import { Clock, FlagTriangleRight, Share, Star } from "lucide-react";
import { AuthContext } from "@/context/Auth";
import { addFavourite, addReport, removeFavourite } from "@/api/sponsorship";
import { toast } from "react-toastify";
import { DEFAULT_ERROR_MESSAGE } from "@/constants/Messages.constants";
import { AuthInfoModal } from "@/components/core/AuthInfoModal";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { reportFormSchema } from "./validationSchema";
import { FormInput } from "@/components/forms/FormInput";
import { Form } from "@/components/ui/form";
import { Spinner } from "@/components/core/Loader";
import { SheetClose } from "@/components/ui/sheet";
import { ROLES } from "@/constants/Auth.constants";

interface ItemActionProps {
  id: string;
  isOwner: boolean;
  isFavourite: boolean;
  favouriteCount: number;
  isApproved: boolean;
  reports: string[];
}

export const ItemActions = ({
  id,
  isOwner,
  isFavourite,
  favouriteCount,
  isApproved,
  reports
}: ItemActionProps) => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [isFav, setIsFav] = useState<boolean>(false);
  const [favCount, setFavCount] = useState<number>(0);
  const btnRef = useRef<HTMLButtonElement>(null);
  const reportBtnRef = useRef<HTMLButtonElement>(null);
  const url = import.meta.env.VITE_CLIENT_LOCAL_URL;

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

  const copysShareLink = async (id: string) => {
    try {
      navigator.clipboard.writeText(`${url}/list?id=${id}`);
      toast.success("Copied link to clipboard");
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
          <Share
            onClick={() => copysShareLink(id)}
            className="ize-6 p-1 text-slate-500 hover:cursor-pointer hover:bg-slate-300 hover:rounded"
          />
          {!isOwner && (
            <div className="flex">
              {user?.roles.includes(ROLES.Admin) && reports.length > 0 && (
                <p className="text-sm text-slate-500 my-auto">
                  {reports.length}
                </p>
              )}
              <FlagTriangleRight
                onClick={() => reportBtnRef.current?.click()}
                className="ize-6 p-1 text-slate-500 hover:cursor-pointer hover:bg-slate-300 hover:rounded"
              />
            </div>
          )}
        </div>
      ) : (
        <div className="flex justify-center items-center space-x-1 text-slate-500 italic">
          <Clock className="size-4" />
          <p className="text-xs">Pending approval</p>
        </div>
      )}
      <ReportPanel
        isAdmin={user?.roles.includes(ROLES.Admin) && reports.length > 0}
        id={id}
        reports={reports}
      >
        <Button ref={reportBtnRef} className="hidden"></Button>
      </ReportPanel>
    </>
  );
};

interface ReportPanelProps {
  id: string;
  isAdmin: boolean | undefined;
  children: JSX.Element;
  reports: string[];
}

const ReportPanel = ({ id, isAdmin, children, reports }: ReportPanelProps) => {
  const closeBtn = useRef<HTMLButtonElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof reportFormSchema>>({
    resolver: zodResolver(reportFormSchema),
    defaultValues: {
      message: ""
    }
  });

  async function onSubmit(values: z.infer<typeof reportFormSchema>) {
    setIsLoading(true);
    try {
      await addReport(values, id);
      setIsLoading(false);
      toast.success("Your report has been sent!");
      closeBtn.current?.click();
    } catch (error) {
      console.error(error);
      toast.error(DEFAULT_ERROR_MESSAGE);
    }
    reset();
  }
  const { reset } = form;

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isAdmin ? "Reports" : "Report"}</DialogTitle>
          <DialogDescription>
            {!isAdmin && "Please let us know what the issue is:"}
          </DialogDescription>
        </DialogHeader>
        {!isAdmin ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormInput
                form={form}
                name="message"
                label="Message"
                type="textarea"
              />
              <Button
                className="sponsorship-base mt-4"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? <Spinner size="sm" /> : "Submit"}
              </Button>
              <SheetClose ref={closeBtn}></SheetClose>
            </form>
          </Form>
        ) : (
          <>
            {reports.map((report, index) => (
              <p key={index}>
                {index + 1}. {report}
              </p>
            ))}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
