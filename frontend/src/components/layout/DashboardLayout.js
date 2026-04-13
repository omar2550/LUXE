import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { LayoutDashboard, ShoppingBag, Users, Settings, Home, } from "lucide-react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "../AppSidbar";
const menuItems = [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Products", url: "/dashboard/products", icon: ShoppingBag },
    { title: "Customers", url: "/dashboard/customers", icon: Users },
    { title: "Settings", url: "/dashboard/settings", icon: Settings },
    { title: "Home", url: "/", icon: Home },
];
const DashboardLayout = () => {
    return (_jsxs(SidebarProvider, { className: "bg-surface", children: [_jsx(AppSidebar, { menuItems: menuItems }), _jsxs(SidebarInset, { children: [_jsx(Outlet, {}), _jsx(Footer, {})] })] }));
};
export default DashboardLayout;
