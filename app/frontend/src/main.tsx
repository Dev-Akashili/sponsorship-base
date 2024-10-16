import "./globals.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Root } from "./routes/Root";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./pages/error/ErrorFallback";
import { AuthProvider } from "./context/Auth";
import { ToggleProvider } from "./context/Toggle";
import { QueryProvider } from "./context/Query";
import ToastContainer from "./components/core/ToastContainer";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ErrorBoundary fallback={<ErrorFallback />}>
        <AuthProvider>
          <ToggleProvider>
            <QueryProvider>
              <Root />
              <ToastContainer />
            </QueryProvider>
          </ToggleProvider>
        </AuthProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>
);
