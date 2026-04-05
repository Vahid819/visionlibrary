"use client";

import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "./ui/separator";
import { ThemeToggle } from "./ThemeToggle";

import { ChevronDown, House, Building2, BanknoteArrowDown, Armchair } from "lucide-react";

export function AppSidebar() {
  return (
    <Sidebar
      variant="floating"
      collapsible="icon"
      className=" w-64 data-[collapsible=icon]:w-16"
    >
      {/* 🔹 HEADER */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="flex  w-full items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-white/10 border border-transparent group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:py-2">
                  <Building2 size={40}/>
                  <span className="truncate group-data-[collapsible=icon]:hidden">
                    Select Workspace
                  </span>
                  <ChevronDown className="ml-auto h-4 w-4 group-data-[collapsible=icon]:hidden" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-50">
                <DropdownMenuItem>Acme Inc</DropdownMenuItem> 
                <DropdownMenuItem>Vision Library</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      
      <Separator className="px-1 w-auto" />
      {/* 🔹 CONTENT */}
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/dashboard" className="cursor-pointer">
              <SidebarMenuButton
                tooltip="Home"
                className="flex items-center w-full h-12 mx-auto group-data-[collapsible=icon]:justify-center gap-4 px-3 py-2 text-sm rounded-md cursor-pointer hover:bg-white/10"
              >
                <House size={40} />
                <span>Home</span>
              </SidebarMenuButton>
            </Link>
            <Link href="/dashboard/payment" className="cursor-pointer">
              <SidebarMenuButton
                tooltip="Payment"
                className="flex items-center w-full h-12 mx-auto group-data-[collapsible=icon]:justify-center gap-4 px-3 py-2 text-sm rounded-md cursor-pointer hover:bg-white/10"
              >
                <BanknoteArrowDown size={40}/>
                <span>Payment</span>
              </SidebarMenuButton>
            </Link>
            <Link href="/dashboard/seat" className="cursor-pointer">
              <SidebarMenuButton
                tooltip="Seat"
                className="flex items-center w-full h-12 mx-auto group-data-[collapsible=icon]:justify-center gap-4 px-3 py-2 text-sm rounded-md cursor-pointer hover:bg-white/10"
              >
                <Armchair size={40}/>
                <span>Seat</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      <Separator className="px-1 w-auto" />
        {/* 🔹 FOOTER */}
      <SidebarFooter>
        <ThemeToggle />
      </SidebarFooter>
    </Sidebar>
  );
}
