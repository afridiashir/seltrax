import { BadgeDollarSign, BadgePercent, Bell, BellDot, Calendar, ChartLine, CirclePercent, CirclePlus, CircleQuestionMark, CreditCard, Facebook, Files, Home, Images, Inbox, Landmark, Link2, Package, PaintBucket, PlugIcon, ReceiptText, ScanBarcode, Search, Settings, SettingsIcon, ShoppingBag, SquareMousePointer, Store, User } from "lucide-react"

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
        title: "General",
        url: "/settings/general",
        icon: Store,
    },
    {
        title: "Plans",
        url: "/settings/plans",
        icon: CirclePercent,
    },
    {
        title: "Billing",
        url: "/settings/billing",
        icon: ReceiptText,
    },
    {
        title: "Domains",
        url: "/settings/domains",
        icon: SquareMousePointer,
    },
    {
        title: "Payment Methods",
        url: "/settings/payment-methods",
        icon: CreditCard,
    },
    {
        title: "Shippings & Delivery",
        url: "/settings/shippings",
        icon: Package,
    },
    {
        title: "Taxes & Duties",
        url: "/settings/taxes",
        icon: BadgeDollarSign,
    },
    {
        title: "Staff Users",
        url: "/settings/users",
        icon: User,
    },
    {
        title: "Notifications",
        url: "/settings/notifications",
        icon: Bell,
    },
    {
        title: "Policies",
        url: "/settings/policies",
        icon: Files,
    },
];


export function SettingsSidebar() {
    return (
        <Sidebar variant={"floating"} collapsible="none" className="border rounded-lg" >
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarGroupLabel>Store Settings</SidebarGroupLabel>
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