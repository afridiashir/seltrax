import { Button } from "@/components/ui/button";
import { Moon, Sun, Zap } from "lucide-react";
import { useTheme } from "next-themes";

export const AuthHeader = () => {

    const { theme, setTheme } = useTheme();
    return (
        <div className="fixed top-0 left-0 right-0 w-full p-6 flex justify-between items-center">
            <div className="flex items-center h-full gap-2 w-auto md:w-[16rem] px-4">
                <p className="text-foreground font-bold text-2xl text-semibold flex items-center gap-1"><Zap color="#2B7FFF" fill="#2B7FFF" className="h-6 w-6 text-primary" />Seltrax</p>
            </div>
            <Button
                variant="outline"
                className="shadow-xs"
                size="icon"
                onClick={() =>
                    setTheme(theme === "dark" ? "light" : "dark")
                }
            >
                {theme === "dark" ? (
                    <Sun className="h-4 w-4" />
                ) : (
                    <Moon className="h-4 w-4" />
                )}
            </Button>
        </div>
    );
};