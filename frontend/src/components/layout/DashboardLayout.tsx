import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Settings,
  Home,
} from "lucide-react";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "../AppSidbar";
import { AnimatePresence, motion } from "framer-motion";

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Products", url: "/dashboard/products", icon: ShoppingBag },
  { title: "Customers", url: "/dashboard/customers", icon: Users },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
  { title: "Home", url: "/", icon: Home },
];

const DashboardLayout = () => {
  return (
    <SidebarProvider className="bg-surface">
      <AppSidebar menuItems={menuItems} />
      <SidebarInset>
        <Outlet />
        <Footer />
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
