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
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "./ui/separator";
import { ThemeToggle } from "./ThemeToggle";

import {
  ChevronDown,
  House,
  Building2,
  BanknoteArrowDown,
  Armchair,
  Settings,
  CircleEllipsis,
} from "lucide-react";

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
        {/* 🔹 Trigger */}
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton
            className="
              flex items-center w-full h-11 gap-3 px-3 rounded-lg
              bg-muted/30 hover:bg-muted transition-all
              border border-transparent hover:border-border
              group-data-[collapsible=icon]:justify-center
              group-data-[collapsible=icon]:px-0
            "
          >
            {/* Workspace Icon */}
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-background">
              <Building2 size={16} />
            </div>

            {/* Text */}
            <div className="flex flex-col text-left leading-tight group-data-[collapsible=icon]:hidden">
              <span className="text-sm font-medium">
                Vision Library
              </span>
              <span className="text-[11px] text-muted-foreground">
                Switch workspace
              </span>
            </div>

            {/* Arrow */}
            <ChevronDown
              size={16}
              className="ml-auto opacity-50 group-data-[collapsible=icon]:hidden"
            />
          </SidebarMenuButton>
        </DropdownMenuTrigger>

        {/* 🔹 Content */}
        <DropdownMenuContent
          align="start"
          className="w-56 p-2 rounded-xl"
        >
          {/* Workspace List */}
          <DropdownMenuItem className="flex items-center gap-2 px-2 py-2 rounded-md">
            <div className="w-6 h-6 rounded bg-muted flex items-center justify-center text-xs">
              A
            </div>
            Acme Inc
          </DropdownMenuItem>

          <DropdownMenuItem className="flex items-center gap-2 px-2 py-2 rounded-md">
            <div className="w-6 h-6 rounded bg-muted flex items-center justify-center text-xs">
              V
            </div>
            Vision Library
          </DropdownMenuItem>

          {/* Divider */}
          <div className="my-1 h-px bg-border" />

          {/* Create Workspace */}
          <DropdownMenuItem className="px-2 py-2 text-sm text-muted-foreground hover:text-foreground">
            + Create Workspace
          </DropdownMenuItem>
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
                <House size={24} />
                <span className="group-data-[collapsible=icon]:hidden">
                  Home
                </span>
              </SidebarMenuButton>
            </Link>
            <Link href="/dashboard/payment" className="cursor-pointer">
              <SidebarMenuButton
                tooltip="Payment"
                className="flex items-center w-full h-12 mx-auto group-data-[collapsible=icon]:justify-center gap-4 px-3 py-2 text-sm rounded-md cursor-pointer hover:bg-white/10"
              >
                <BanknoteArrowDown size={40} />
                <span className="group-data-[collapsible=icon]:hidden">
                  Payment
                </span>
              </SidebarMenuButton>
            </Link>
            <Link href="/dashboard/seat" className="cursor-pointer">
              <SidebarMenuButton
                tooltip="Seat"
                className="flex items-center w-full h-12 mx-auto group-data-[collapsible=icon]:justify-center gap-4 px-3 py-2 text-sm rounded-md cursor-pointer hover:bg-white/10"
              >
                <Armchair size={40} />
                <span className="group-data-[collapsible=icon]:hidden">
                  Seat
                </span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      <Separator className="px-1 w-auto" />
      {/* 🔹 FOOTER */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <Popover>
              {/* 🔹 Trigger */}
              <PopoverTrigger asChild>
                <SidebarMenuButton
                  className="
              flex items-center w-full h-12 gap-3 px-3 rounded-lg
              transition-all duration-200
              hover:bg-muted/70
              group-data-[collapsible=icon]:justify-center
              group-data-[collapsible=icon]:px-0
            "
                >
                  {/* Icon */}
                  <CircleEllipsis size={18} />
                  {/* Text */}
                  <div className="flex flex-col text-left group-data-[collapsible=icon]:hidden">
                    <span className="text-sm font-medium leading-none">
                      Account
                    </span>
                    <span className="text-xs text-muted-foreground">
                      advanced settings
                    </span>
                  </div>

                  {/* Arrow */}
                  <ChevronDown className="ml-auto size-4 opacity-60 group-data-[collapsible=icon]:hidden" />
                </SidebarMenuButton>
              </PopoverTrigger>

              {/* 🔹 Popover Content */}
              <PopoverContent
                align="end"
                side="top"
                className="
            w-64 p-3 rounded-xl
            bg-background/95 backdrop-blur
            border shadow-lg
            space-y-3
          "
              >
                {/* Header */}
                <div>
                  <p className="text-sm font-semibold">Account</p>
                  <p className="text-xs text-muted-foreground">
                    Manage your preferences
                  </p>
                </div>

                {/* Divider */}
                <div className="h-px bg-border" />

                {/* Settings */}
                <Link
                  href="/dashboard/settings"
                  className="
              flex items-center gap-2 px-2 py-2 rounded-md text-sm
              hover:bg-muted transition-colors
            "
                >
                  <Settings size={18} className="opacity-70" />
                  Settings
                </Link>

                {/* Theme */}
                <div>
                  <p className="text-xs text-muted-foreground mb-2 px-1">
                    Theme
                  </p>
                  <ThemeToggle />
                </div>
              </PopoverContent>
            </Popover>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
