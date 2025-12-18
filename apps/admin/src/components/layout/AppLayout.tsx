import { AppSidebar } from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "../ui/sidebar";
import { Toaster } from "../ui/sonner";

const AppLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex w-full h-screen bg-background text-foreground">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="py-6 px-8 overflow-auto bg-background">
            <Outlet />
          </main>

          <Toaster />
        </div>
      </div>

    </SidebarProvider>

  );
};

export default AppLayout;
