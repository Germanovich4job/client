import { Outlet } from "@tanstack/react-router"
import Header from "../components/Header"
import { MuiSidebar } from "../components/MuiSidebar"
import "../App.css"

export const AppLayout = () => {
  return (
    <>
      <div className="h-screen overflow-hidden bg-gray-100 flex flex-col">
        <header className="h-14 text-white flex items-center justify-center">
          <Header />
        </header>
        <main className="flex h-full w-full">
          <div className="w-72 bg-gray-200">
            <MuiSidebar />
          </div>
          <div className="overflow-auto h-full w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  )
}
