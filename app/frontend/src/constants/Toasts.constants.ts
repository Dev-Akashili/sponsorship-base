import { Bounce, ToastOptions } from "react-toastify";

export const TOAST_OPTIONS: ToastOptions = {
  position: "top-center",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  draggable: true,
  progress: undefined,
  pauseOnHover: false,
  pauseOnFocusLoss: false,
  theme: "colored",
  transition: Bounce
};
