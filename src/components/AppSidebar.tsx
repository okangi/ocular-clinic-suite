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
  Stethoscope,
  LogOut,
  User
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
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
  const { user, profile, signOut } = useAuth();

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'optometrist':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'technician':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'receptionist':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-primary/10 text-primary font-medium border-r-2 border-primary" : "hover:bg-muted/50";

  // Filter navigation based on user role
  const getFilteredNavigation = () => {
    if (!profile) return navigationItems;
    
    const rolePermissions = {
      admin: navigationItems, // Admin sees everything
      optometrist: navigationItems.filter(item => 
        !item.url.includes('/users') // Optometrists don't see user management
      ),
      technician: navigationItems.filter(item => 
        ['/appointments', '/examinations', '/patients', '/inventory'].some(path => item.url.includes(path))
      ),
      receptionist: navigationItems.filter(item => 
        ['/appointments', '/patients', '/prescriptions'].some(path => item.url.includes(path))
      )
    };
    
    return rolePermissions[profile.role] || navigationItems;
  };

  return (
    <Sidebar className={state === "collapsed" ? "w-14" : "w-60 md:w-64"} collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground px-3 py-2">
            {profile?.role === 'admin' ? 'All Modules' : 'Available Modules'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {getFilteredNavigation().map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={({ isActive }) => 
                        `flex items-center gap-2 md:gap-3 px-2 md:px-3 py-2 rounded-md transition-all duration-200 ${getNavCls({ isActive })}`
                      }
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {state !== "collapsed" && <span className="text-sm truncate">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

      </SidebarContent>
      
      <SidebarFooter className="border-t border-border/50">
        <div className="p-3 md:p-4 space-y-3">
          {profile && state !== "collapsed" && (
            <div className="flex items-center gap-2 md:gap-3">
              <div className="p-1.5 md:p-2 rounded-full bg-primary/10 shrink-0">
                <User className="h-3 w-3 md:h-4 md:w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs md:text-sm font-medium text-foreground truncate">
                  {profile.first_name} {profile.last_name}
                </p>
                <div className="flex items-center gap-1">
                  <Badge 
                    variant="secondary" 
                    className={`text-xs capitalize ${getRoleColor(profile.role)}`}
                  >
                    {profile.role}
                  </Badge>
                  {profile.is_active && (
                    <div className="h-2 w-2 bg-success rounded-full" title="Active" />
                  )}
                </div>
                {profile.department && (
                  <p className="text-xs text-muted-foreground truncate">
                    {profile.department}
                  </p>
                )}
              </div>
            </div>
          )}
          
          {profile && state === "collapsed" && (
            <div className="flex justify-center">
              <div className="p-2 rounded-full bg-primary/10">
                <User className="h-4 w-4 text-primary" />
              </div>
            </div>
          )}
          
          <Button 
            variant="outline" 
            onClick={signOut}
            className={`w-full justify-start gap-2 text-muted-foreground hover:text-foreground transition-colors ${
              state === "collapsed" ? "px-2" : ""
            }`}
          >
            <LogOut className="h-3 w-3 md:h-4 md:w-4" />
            {state !== "collapsed" && <span className="text-sm">Sign Out</span>}
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}