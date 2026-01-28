import { Outlet } from "@tanstack/react-router";
import Header from "../components/Header";
import "../App.css";

export const AppLayout = () => {
  return (
    <>
      <div className="h-screen overflow-hidden flex flex-col">
        <header className="bg-white flex items-center justify-center">
          <Header />
        </header>
        <main className="flex h-full w-full flex-row gap-4 p-6">
          <div className="w-72 bg-blue-50"></div>

          <div className="overflow-auto h-full w-full bg-blue-50">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
};
