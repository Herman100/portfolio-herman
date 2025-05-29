"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
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
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "HKB Admin",
    email: "hermankwamebour30@gmail.com",
  },
  teams: [
    {
      name: "HKB Admin",
      logo: User,
      plan: "Admin",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: GalleryVerticalEnd,
      isActive: true,
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
          url: "#",
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
          url: "#",
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
  return (
    <div>
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <TeamSwitcher teams={data.teams} />
        </SidebarHeader>
        <div className="flex items-end justify-center h-16 shrink-0 px-4">
          <SidebarTrigger />
        </div>
        <SidebarContent>
          <NavMain items={data.navMain} />
          <NavProjects projects={data.projects} />
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </div>
  );
}
