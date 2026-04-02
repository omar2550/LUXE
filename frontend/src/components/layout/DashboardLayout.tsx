import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Settings,
  ChevronUp,
  UserCircle,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import AppSidebar from "../AppSidbar";

const menuItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Products", url: "/products", icon: ShoppingBag },
  { title: "Customers", url: "/customers", icon: Users },
  { title: "Settings", url: "/settings", icon: Settings },
];

const DashboardLayout = () => {
  return (
    <SidebarProvider className="bg-surface">
      <AppSidebar />

      <SidebarInset>
        <main className="">
          <Outlet />
          <Footer />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
