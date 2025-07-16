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
      <header className="h-16 flex items-center justify-between border-b bg-card px-6 shadow-sm">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="h-8 w-8" />
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
              <span className="text-white font-bold text-sm">OC</span>
            </div>
            <div>
              <h1 className="font-semibold text-foreground">OcularCare Suite</h1>
              <p className="text-xs text-muted-foreground">Comprehensive Eye Care Management</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <User className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 p-6 bg-background">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}