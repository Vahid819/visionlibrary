import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "next-themes";

export default function DashboardLayout({ children }) {
  return (
    <TooltipProvider>
      {" "}
      {/* ✅ FIX */}
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <main className="p-2 bg-blend-darken">
            {/* 🔹 MAIN CONTENT */}
            <SidebarTrigger />
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              {children}
              <Toaster richColors position="top-right" />
            </ThemeProvider>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
