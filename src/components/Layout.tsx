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
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header className="h-12 md:h-14 flex items-center justify-between px-3 md:px-6 border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shrink-0">
            <SidebarTrigger className="lg:hidden" />
            <div className="flex items-center gap-2 md:gap-4 min-w-0">
              <div className="h-6 w-6 md:h-8 md:w-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shrink-0">
                <span className="text-white font-bold text-xs md:text-sm">OC</span>
              </div>
              <div className="min-w-0 hidden sm:block">
                <h1 className="text-base md:text-xl font-semibold text-foreground truncate">
                  Ocular Clinic Suite
                </h1>
              </div>
              <h1 className="text-base font-semibold text-foreground sm:hidden">
                OCS
              </h1>
            </div>
            
            <div className="flex items-center gap-1 md:gap-2 shrink-0">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <User className="h-4 w-4" />
              </Button>
            </div>
          </header>
          
          {/* Main Content */}
          <div className="flex-1 p-3 sm:p-4 md:p-6 overflow-auto min-w-0">
            <div className="max-w-full">
              {children}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}