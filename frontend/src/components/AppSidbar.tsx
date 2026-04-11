import { ChevronUp, UserCircle } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";

export function AppSidebar({ menuItems }) {
  const { pathname } = useLocation();

  return (
    <Sidebar variant="sidebar" collapsible="icon" className="relative">
      <SidebarTrigger
        className={
          "absolute group-data-[collapsible=icon]:hidden rounded-md top-5 right-3 z-50"
        }
      />
      {/* --- Header: Logo --- */}
      <SidebarHeader className="ghost-border pb-1">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="cursor-default hover:bg-transparent px-0"
            >
              <div className="flex flex-col gap-0.5 leading-none w-full relative overflow-hidden">
                <div className="flex flex-col transition-all duration-300 group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:invisible">
                  <span className="font-display font-semibold tracking-tightest whitespace-nowrap [mask-image:linear-gradient(to_right,black_80%,transparent_100%)]">
                    Admin Panel LUXE
                  </span>
                  <span className="text-[10px] text-on-surface-variant">
                    Management
                  </span>
                </div>

                <div className="absolute inset-1 flex items-center justify-center opacity-0 invisible transition-all duration-300 group-data-[collapsible=icon]:opacity-100 group-data-[collapsible=icon]:visible">
                  <span className="font-display font-bold tracking-tightest text-primary">
                    <SidebarTrigger />
                  </span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* --- Main Content: Links --- */}
      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel className="text-on-surface-variant">
            Main Menu
          </SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu className="mt-3">
              {menuItems.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      className={`relative flex items-center gap-3 hover:bg-on-surface-variant/20 hover:text-primary transition-all duration-300 p-2 h-12 group-data-[collapsible=icon]:p-0 my-1 rounded-md ${isActive ? "bg-surface-container-low text-primary" : ""}`}
                    >
                      <item.icon size={18} className={`ml-1`} />
                      <Link to={item.url} className={`absolute inset-0`} />
                      <span>{item.title}</span>
                      {pathname === item.url && (
                        <div className="group-data-[collapsible=icon]:hidden inline-block -mr-2 ml-auto w-1 h-[200%] bg-signature-gradient" />
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* --- Footer: User Profile --- */}
      <SidebarFooter className="border-t ghost-border pt-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent"
            >
              <UserCircle className="size-5" />
              <div className="flex flex-col items-start text-sm">
                <span className="font-medium text-on-surface">Omar Ali</span>
                <span className="text-xs text-on-surface-variant">
                  Admin Account
                </span>
              </div>
              <ChevronUp className="ml-auto size-4 text-on-surface-variant" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
