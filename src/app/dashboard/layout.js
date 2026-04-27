import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "next-themes";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function DashboardLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <TooltipProvider>
      {" "}
      {/* ✅ FIX */}
      <SidebarProvider>
        <AppSidebar session={session} />
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
