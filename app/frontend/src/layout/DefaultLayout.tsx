import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/core/Navbar";
import { Footer } from "@/components/core/Footer";

export const DefaultLayout = () => {
  return (
    <>
      <Navbar />
      <div className="bg-slate-100 overflow-auto">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
