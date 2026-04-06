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
        <main>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
          <Footer />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
