import { SidebarTrigger } from "../ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "../ui/command"
import { Button } from "../ui/button"
import { Moon, Sun, Search, LogOut, User, Settings, Zap } from "lucide-react"
import { useState } from "react"
import { useTheme } from "next-themes" // works in Vite too if installed
import { useAuthStore } from "@/stores/auth.store";
import { StoreSwitcher } from "./ProjectSwitch"

const Header = () => {
  const [openSearch, setOpenSearch] = useState(false)
  const { theme, setTheme } = useTheme();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  return (
    <>
      {/* HEADER BAR */}
      <header className="bg-sidebar h-[55px] flex items-center border-b gap-2 bg-background">
        <div className="flex items-center h-full gap-2 w-auto md:w-[16rem] border-r-none md:border-r px-4">
          <p className="text-foreground font-bold text-2xl text-semibold flex items-center gap-1"><Zap color="#2B7FFF" fill="#2B7FFF" className="h-6 w-6 text-primary" />Seltrax</p>
        </div>
        <div className="flex-1 flex items-center justify-end md:justify-between gap-2 w-full px-4">
          <div className="hidden md:block"></div>
          {/* LEFT */}
          <Button variant={"outline"} size={"icon"} className="block md:hidden  shadow-xs">

            <SidebarTrigger />
          </Button>
          <Button
            variant="outline"
            onClick={() => setOpenSearch(true)}
            className="w-auto md:w-1/3 shadow-xs"
          >
            <Search className="h-4 w-4" />
            <span className="hidden md:block font-light text-xs">Search...</span>
          </Button>

          {/* RIGHT */}
          <div className="flex items-center gap-2">
            <StoreSwitcher />
            {/* THEME TOGGLE */}
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

            {/* USER DROPDOWN */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer border shadow-xs">
                  <AvatarImage src="/avatdsadar.jpg" />
                  <AvatarFallback>{user?.name.split("")[0]}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem className="text-red-500" onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

        </div>
      </header>

      {/* SEARCH POPUP */}
      <CommandDialog open={openSearch} onOpenChange={setOpenSearch}>
        <CommandInput placeholder="Search products, orders, settings..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Navigation">
            <CommandItem>Dashboard</CommandItem>
            <CommandItem>Orders</CommandItem>
            <CommandItem>Products</CommandItem>
            <CommandItem>Settings</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}

export default Header
