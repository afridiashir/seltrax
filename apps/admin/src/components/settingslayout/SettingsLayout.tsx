import { AppSidebar } from "../layout/Sidebar";
import Header from "../layout/Header";
import { Link, Outlet } from "react-router-dom";
import { SidebarProvider } from "../ui/sidebar";
import { Toaster } from "../ui/sonner";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { SettingsSidebar } from "./SettingsSidebar";

const SettingsLayout = () => {
    return (
        <SidebarProvider>
            <div className="w-full max-h-screen bg-background text-foreground p-4 transition-all">
                <div>
                    <Link to="/home"><Button variant="outline" size="sm"><ArrowLeft /> Back to home</Button></Link>
                </div>
                <div className="flex px-96 py-8 h-[calc(100vh-55px)] gap-8">
                    <SettingsSidebar />

                    <main className="flex-1 overflow-hidden bg-background border rounded-lg shadow-sm">
                        <Outlet />
                    </main>

                    <Toaster position="top-right" />
                </div>
            </div>

        </SidebarProvider>

    );
};

export default SettingsLayout;
