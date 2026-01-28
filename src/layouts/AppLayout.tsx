import { Outlet } from "@tanstack/react-router";
import Header from "../components/Header";
import "../App.css";

export const AppLayout = () => {
  return (
    <>
      <div className="h-screen overflow-hidden bg-blue-100 flex flex-col">
        <header className="bg-white flex items-center justify-center">
          <Header />
        </header>
        <main className="flex h-full w-full flex-row gap-2">
          <div className="w-72 bg-white"></div>

          <div className="overflow-auto h-full w-full bg-white">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
};
