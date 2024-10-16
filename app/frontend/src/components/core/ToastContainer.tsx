import { ToastContainer as Toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastContainer = () => {
  const isMobile = window.innerWidth <= 600;
  const toastPosition = isMobile ? "bottom-center" : "bottom-right";

  return (
    <Toast
      position={toastPosition}
      autoClose={3000}
      hideProgressBar={false}
      closeOnClick={true}
      draggable={true}
      pauseOnHover={false}
      pauseOnFocusLoss={false}
      theme={"colored"}
      transition={Bounce}
      style={{
        fontSize: "14px",
        fontWeight: "bold"
      }}
      newestOnTop
    />
  );
};

export default ToastContainer;
