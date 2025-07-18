import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Bell, User } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      {/* Header */}
      <header className="h-14 md:h-16 flex items-center justify-between border-b bg-card px-3 md:px-6 shadow-sm">
        <div className="flex items-center gap-2 md:gap-4 min-w-0 flex-1">
          <SidebarTrigger className="h-8 w-8 shrink-0" />
          <div className="flex items-center gap-2 md:gap-3 min-w-0">
            <div className="h-6 w-6 md:h-8 md:w-8 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-xs md:text-sm">OC</span>
            </div>
            <div className="min-w-0">
              <h1 className="font-semibold text-foreground text-sm md:text-base truncate">OcularCare Suite</h1>
              <p className="text-xs text-muted-foreground hidden sm:block truncate">Comprehensive Eye Care Management</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-1 md:gap-2 shrink-0">
          <Button variant="ghost" size="sm" className="h-7 w-7 md:h-8 md:w-8 p-0">
            <Bell className="h-3 w-3 md:h-4 md:w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-7 w-7 md:h-8 md:w-8 p-0">
            <User className="h-3 w-3 md:h-4 md:w-4" />
          </Button>
        </div>
      </header>

      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 p-3 md:p-6 bg-background overflow-x-hidden">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}