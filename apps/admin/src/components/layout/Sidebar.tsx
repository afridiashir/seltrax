import { Calendar, ChartLine, CirclePercent, CirclePlus, CircleQuestionMark, Facebook, Home, Images, Inbox, Landmark, Package, ScanBarcode, Search, Settings, SettingsIcon, ShoppingBag, User } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom"
// Menu items.
const items = [
  {
    title: "Home",
    url: "/home",
    icon: Home,
  },
  {
    title: "Orders",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Products",
    url: "/products",
    icon: Package,
  },
  {
    title: "Customers",
    url: "#",
    icon: User,
  },
  {
    title: "Media",
    url: "/media",
    icon: Images,
  },
  {
    title: "Coupons",
    url: "/coupons",
    icon: CirclePercent,
  },
  {
    title: "Finance",
    url: "/finance",
    icon: Landmark,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: ChartLine,
  },
];

const channels = [
  {
    title: "Online Store",
    url: "/store",
    icon: ShoppingBag,
  },
  {
    title: "Point of Sales",
    url: "/pos",
    icon: ScanBarcode,
  },
];

const apps = [
  {
    title: "Pixel",
    url: "/pixel",
    icon: Facebook,
  },
  {
    title: "Integrate App",
    url: "/apps",
    icon: CirclePlus,
  },
];
export function AppSidebar() {
  return (
    <Sidebar variant="sidebar" collapsible="offcanvas">
      <SidebarHeader className="flex items-center flex-row p-3 gap-1"><img src="/Seltrax.png" alt="" className="w-8 h-8" /><h1 className="text-foreground font-medium text-2xl">Seltrax</h1></SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} replace>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarGroupLabel>Sales Channels</SidebarGroupLabel>
            <SidebarMenu>
              {channels.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} replace>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarGroupLabel>Apps</SidebarGroupLabel>
            <SidebarMenu>
              {apps.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} replace>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto" />
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem >
                <SidebarMenuButton asChild>
                  <Link to={'#'} replace>
                    <SettingsIcon />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem >
                <SidebarMenuButton asChild>
                  <Link to={'#'} replace>
                    <CircleQuestionMark />
                    <span>Help</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}