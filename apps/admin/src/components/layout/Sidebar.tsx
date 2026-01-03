import { Calendar, ChartLine, CirclePercent, CirclePlus, CircleQuestionMark, Facebook, Home, Images, Inbox, Landmark, Package, PlugIcon, ScanBarcode, Search, Settings, SettingsIcon, ShoppingBag, User } from "lucide-react"

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
import { Link, NavLink } from "react-router-dom"
// Menu items.
const items = [
  {
    title: "Home",
    url: "/home",
    icon: Home,
  },
  {
    title: "Orders",
    url: "/orders",
    icon: Inbox,
  },
  {
    title: "Products",
    url: "/products",
    icon: Package,
  },
  {
    title: "Customers",
    url: "/customers",
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
    title: "Reports",
    url: "/reports",
    icon: ChartLine,
  },
];

const channels = [
  {
    title: "Store Front",
    url: "/website",
    icon: ShoppingBag,
  },
  // {
  //   title: "Point of Sales",
  //   url: "/pos",
  //   icon: ScanBarcode,
  // },
];

const apps = [
  {
    title: "Whatsapp",
    url: "/whatsapp",
    icon: PlugIcon,
  },
  {
    title: "Add an app",
    url: "/apps",
    icon: CirclePlus,
  },
];
export function AppSidebar() {
  return (
    <Sidebar variant={"sidebar"} collapsible="offcanvas" className="relative max-h-[calc(100vh-55px)]">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarLink
                  key={item.title}
                  to={item.url}
                  icon={item.icon}
                  label={item.title}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarGroupLabel>Website</SidebarGroupLabel>
            <SidebarMenu>
              {channels.map((item) => (
                <SidebarLink
                  key={item.title}
                  to={item.url}
                  icon={item.icon}
                  label={item.title}
                />
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
              <SidebarLink to="/settings/general" icon={SettingsIcon} label="Settings" />
              <SidebarLink to="/help" icon={CircleQuestionMark} label="Help" />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

const SidebarLink = ({ to, icon: Icon, label }: any) => {
  return (
    <NavLink to={to}>
      {({ isActive }) => (
        <SidebarMenuItem>
          <SidebarMenuButton
            data-active={isActive}
            className="data-[active=true]:bg-muted data-[active=true]:text-foreground cursor-pointer"
          >
            <Icon />
            <span>{label}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      )}
    </NavLink>
  )
}