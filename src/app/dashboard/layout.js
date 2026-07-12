import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { getServerSession } from "next-auth";
import { LifeBuoy } from "lucide-react";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { AppSidebar } from "@/components/app-sidebar";

export default async function DashboardLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <SidebarProvider>
          <AppSidebar session={session} />

          <SidebarInset>
            <main className="relative min-h-screen bg-background p-4">
              {/* Sidebar Toggle */}
              <SidebarTrigger className="mb-4" />

              {/* Page Content */}
              {children}

              {/* Help Center */}
              <div className="fixed bottom-6 right-6 z-50">
                <button
                  className="
      group
      flex items-center
      h-14
      w-14 hover:w-44
      overflow-hidden
      rounded-full
      bg-primary
      text-primary-foreground
      shadow-lg
      transition-all
      duration-300
      ease-in-out
      hover:shadow-xl
      cursor-pointer
    "
                >
                  {/* Icon */}
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center">
                    <LifeBuoy className="h-6 w-6" />
                  </div>

                  {/* Text */}
                  <span
                    className="
        whitespace-nowrap
        opacity-0
        group-hover:opacity-100
        transition-opacity
        duration-200
        delay-100
        pr-6
        font-medium
      "
                  >
                    Help Center
                  </span>
                </button>
              </div>

              {/* Toast */}
              <Toaster richColors position="top-right" />
            </main>
          </SidebarInset>
        </SidebarProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}
