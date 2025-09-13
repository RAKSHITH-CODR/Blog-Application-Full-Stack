import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      {/* Remove relative/bottom stuff, flex takes care */}
      <Footer className="mt-auto" />
    </div>
  );
};


export default Layout;
