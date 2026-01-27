import { Outlet } from "@tanstack/react-router";
import Header from "../components/Header";
import "../App.css";
import { Card } from "@mui/material";

export const AppLayout = () => {
  return (
    <>
      <div className="h-screen overflow-hidden bg-blue-100 p-2 flex flex-col gap-4">
        <header className="h-14 bg-amber-50 flex items-center justify-center">
          <Header />
        </header>
        <main className="flex h-full w-full flex-row gap-4">
          <div className="w-72 bg-amber-50"></div>
          <div className="overflow-auto h-full w-full bg-amber-50">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
};
