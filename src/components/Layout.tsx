import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { CompareTray } from "@/components/CompareTray";
import { Header } from "@/components/Header";
import { Ticker } from "@/components/Ticker";

export function Layout() {
  return (
    <div className="min-h-screen bg-background relative flex overflow-x-hidden">
      {/* Sidebar is fixed, so it doesn't affect document flow */}
      <AppSidebar />
      
      <Header />
      <Ticker />
      <main className="w-full lg:pl-64 min-h-screen transition-all duration-300 ease-in-out relative flex flex-col pt-[76px] lg:pt-[84px]">
        <div className="flex-1 w-full px-4 sm:px-8 lg:px-12 py-8 animate-fade-in overflow-x-hidden">
          <div className="max-w-[1400px] mx-auto w-full h-full">
            <Outlet />
          </div>
        </div>
      </main>

      <CompareTray />
    </div>
  );
}
