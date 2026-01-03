import { AppSidebar } from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "../ui/sidebar";
import { Toaster } from "../ui/sonner";
const AppLayout = () => {
  return (
    <SidebarProvider>
      <div className="w-full  min-h-screen text-foreground">
        <Header />

        <div className="flex overflow-hidden bg-background ">
          <AppSidebar />

          <main className="flex-1 py-6 px-4 md:px-8 overflow-auto min-h-[calc(100vh-55px)] max-h-[calc(100vh-55px)]">
            <Outlet />
          </main>

          <Toaster position="top-right" />
        </div>
      </div>
    </SidebarProvider>
  );
};
export default AppLayout;