import { NavLink, useLocation } from "react-router-dom";
import {
  Calendar,
  Users,
  Eye,
  FileText,
  Package,
  BarChart3,
  Shield,
  Video,
  Home,
  Stethoscope
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Patient Management", url: "/patients", icon: Users },
  { title: "Appointments", url: "/appointments", icon: Calendar },
  { title: "Eye Examinations", url: "/examinations", icon: Eye },
  { title: "Prescriptions", url: "/prescriptions", icon: FileText },
  { title: "Inventory", url: "/inventory", icon: Package },
  { title: "Reports & Analytics", url: "/reports", icon: BarChart3 },
  { title: "User Management", url: "/users", icon: Shield },
  { title: "Telehealth", url: "/telehealth", icon: Video },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-primary/10 text-primary font-medium border-r-2 border-primary" : "hover:bg-muted/50";

  return (
    <Sidebar className={state === "collapsed" ? "w-14" : "w-64"} collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground px-3 py-2">
            Clinical Modules
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={({ isActive }) => 
                        `flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 ${getNavCls({ isActive })}`
                      }
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {state !== "collapsed" && <span className="truncate">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {state !== "collapsed" && (
          <SidebarGroup className="mt-auto">
            <SidebarGroupContent>
              <div className="p-4 border-t">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center">
                    <Stethoscope className="h-4 w-4 text-accent-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">Dr. Smith</p>
                    <p className="text-xs text-muted-foreground truncate">Optometrist</p>
                  </div>
                </div>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}