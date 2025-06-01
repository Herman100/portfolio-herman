"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  LogOut,
  Map,
  Outdent,
  PieChart,
  Settings,
  Settings2,
  SquareTerminal,
  User,
} from "lucide-react";

import { NavMain } from "@/components/admin/nav-main";
import { NavProjects } from "@/components/admin/nav-projects";
import { NavUser } from "@/components/admin/nav-user";
import { TeamSwitcher } from "@/components/admin/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ThemeSwitcher } from "../themes/theme-toggle";
import { NavLink } from "../home/navlink";
import Link from "next/link";
import { useAuth } from "@/app/contexts/AuthContext";

const data = {
  user: {
    name: "Herman",
    email: "hermankwamebour30@gmail.com",
  },
  // teams: [
  //   {
  //     name: "HKB Admin",
  //     logo: User,
  //     plan: "Admin",
  //   },
  // ],
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: GalleryVerticalEnd,
      // isActive: true,
      items: [
        {
          title: "Dashboard",
          url: "/admin/dashboard",
          icon: GalleryVerticalEnd,
        },
      ],
    },
    {
      title: "Analytics",
      url: "#",
      icon: PieChart,
      items: [
        {
          title: "Overview",
          url: "#",
        },
        {
          title: "Reports",
          url: "#",
        },
        {
          title: "Insights",
          url: "#",
        },
      ],
    },
    {
      title: "Blogs",
      url: "#",
      icon: Frame,
      items: [
        {
          title: "Latest Posts",
          url: "/admin/blogs",
        },

        {
          title: "Categories",
          url: "#",
        },
        {
          title: "Tags",
          url: "#",
        },
      ],
    },

    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
      items: [
        {
          title: "Profile",
          url: "/admin/profile",
        },
        {
          title: "Account",
          url: "#",
        },
        {
          title: "Preferences",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Building Portfolio",
      url: "#",
      icon: SquareTerminal,
    },
    {
      name: "AI Assistant",
      url: "#",
      icon: Bot,
    },
    // {
    //   name: "Data Visualization",
    //   url: "#",
    //   icon: AudioWaveform,
    // },
    // {
    //   name: "Map Integration",
    //   url: "#",
    //   icon: Map,
    // },
    // {
    //   name: "Command Center",
    //   url: "#",
    //   icon: Command,
    // },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { logout } = useAuth();
  return (
    <div>
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          {/* <TeamSwitcher teams={data.teams} /> */}
          <NavUser user={data.user} />
        </SidebarHeader>
        <div className="flex flex-col items-center justify-center h-16 shrink-0 px-4">
          <SidebarTrigger />
          <ThemeSwitcher />
        </div>
        <SidebarContent>
          <NavMain items={data.navMain} />
          <NavProjects projects={data.projects} />
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenuButton asChild onClick={logout}>
            <div className="flex items-center justify-start gap-2">
              <LogOut />
              <Link href="/admin-login">Logout</Link>
            </div>
          </SidebarMenuButton>
          {/* <NavUser user={data.user} /> */}
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </div>
  );
}
