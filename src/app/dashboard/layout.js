import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";

import { TooltipProvider } from "@/components/ui/tooltip";
import { AppSidebar } from "@/components/app-sidebar";

export default function DashboardLayout({ children }) {
  return (
    <TooltipProvider> {/* ✅ FIX */}
      <SidebarProvider>
        <AppSidebar />

        <SidebarInset>
          <main className="p-2">{/* 🔹 MAIN CONTENT */}
            <SidebarTrigger />
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
  
}