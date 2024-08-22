import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/core/Navbar";
import { Footer } from "@/components/core/Footer";
import { useContext } from "react";
import { AuthContext } from "@/context/Auth";

export const DefaultLayout = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Navbar user={user} />
      <div className="bg-slate-100 overflow-auto">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
