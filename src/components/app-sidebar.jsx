"use client";

import Link from "next/link";
import { useState } from "react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  MessageCircleMore,
} from "lucide-react";
import LogoutButton from "./LogoutButton";

export function AppSidebar({ session }) {
  const libraryName = session?.user?.library;

  return (
    <Sidebar
      variant="floating"
      collapsible="icon"
      className=" w-64 data-[collapsible=icon]:w-16"
    >
      {/* 🔹 HEADER */}
        <SidebarHeader className="px-4 py-4">
  <div className="flex items-center gap-3">
    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
      <Building2 className="h-4 w-4 text-primary" />
    </div>

    <div className="group-data-[collapsible=icon]:hidden">
      <h2 className="truncate text-[15px] font-semibold capitalize">
        {session?.user?.library}
      </h2>
    </div>
  </div>
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
            <Link href="/dashboard/message" className="cursor-pointer">
              <SidebarMenuButton
                tooltip="Seat"
                className="flex items-center w-full h-12 mx-auto group-data-[collapsible=icon]:justify-center gap-4 px-3 py-2 text-sm rounded-md cursor-pointer hover:bg-white/10"
              >
                <MessageCircleMore size={40} />
                <span className="group-data-[collapsible=icon]:hidden">
                  Message
                </span>
              </SidebarMenuButton>
            </Link>
            <Link href="/dashboard/settings" className="cursor-pointer">
              <SidebarMenuButton
                tooltip="Settings"
                className="flex items-center w-full h-12 mx-auto group-data-[collapsible=icon]:justify-center gap-4 px-3 py-2 text-sm rounded-md cursor-pointer hover:bg-white/10"
              >
                <Settings size={18} className="opacity-70" />
                <span className="group-data-[collapsible=icon]:hidden">
                  Settings
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
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  {/* Text */}
                  <div className="flex flex-col text-left group-data-[collapsible=icon]:hidden">
                    <span className="text-sm font-medium leading-none">
                      {session?.user?.name || "User"}
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

                {/* Theme */}
                <div>
                  <p className="text-xs text-muted-foreground mb-2 px-1">
                    Theme
                  </p>
                  <ThemeToggle />
                </div>
                {/* LogoutButton */}
                <Separator className="my-1" />
                <LogoutButton />
              </PopoverContent>
            </Popover>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
