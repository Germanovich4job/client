import { Outlet } from "@tanstack/react-router"
import Header from "../components/Header"
import { MuiSidebar } from "../components/MuiSidebar"
import "../App.css"

export const AppLayout = () => {
  return (
    <>
      <div className="flex flex-col w-full justify-start bg-amber-50">
        <Header />
        <main className="flex flex-row min-h-screen w-full transition-all">
          <div className="sticky">
            <MuiSidebar />
          </div>
          <div className="h-auto text-slate-800">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  )
}
