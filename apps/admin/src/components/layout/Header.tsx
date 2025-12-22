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
import { Moon, Sun, Search, LogOut, User, Settings } from "lucide-react"
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
      <header className="bg-white flex items-center justify-between border-b gap-2 bg-background px-8 py-2">

        {/* LEFT */}
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <Button
            variant="outline"
            onClick={() => setOpenSearch(true)}
          >
            <Search className="h-4 w-4" />
            <span className="font-light text-xs">Search...</span>
          </Button>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2">
          <StoreSwitcher />
          {/* THEME TOGGLE */}
          <Button
            variant="outline"
            className="border-none"
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
              <Avatar className="cursor-pointer">
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
