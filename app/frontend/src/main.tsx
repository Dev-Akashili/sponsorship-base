import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Root } from "./routes/Root";
import { ToastContainer } from "react-toastify";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./pages/error/ErrorFallback";
import { AuthProvider } from "./context/Auth";
import { TOAST_OPTIONS } from "./constants/Toasts.constants";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ErrorBoundary fallback={<ErrorFallback />}>
        <AuthProvider>
          <Root />
          <ToastContainer {...TOAST_OPTIONS} newestOnTop />
        </AuthProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>
);
