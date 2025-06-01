"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@/types/user";
import { format } from "date-fns";
import { Mail, User as UserIcon, Calendar, Shield } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/app/contexts/AuthContext";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function ProfilePage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 space-y-6 max-w-2xl">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-[200px]" />
        <Skeleton className="h-[200px]" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto py-8 max-w-2xl">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500">
            Error Loading Profile
          </h1>
          <p className="mt-2 text-gray-600">
            Unable to load user profile. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 max-w-2xl">
      <div className="space-y-6">
        <div className="flex items-center justify-center gap-5">
          <SidebarTrigger className="-ml-1" />
          <h1 className="text-xl font-bold">Profile Information</h1>
        </div>

        {/* Personal Information Card */}
        <Card className="border-none shadow-lg bg-primary/5 dark:bg-primary/10">
          <CardHeader className="border-b border-primary/10 dark:border-primary/20">
            <CardTitle className="flex items-center gap-2 text-lg text-primary dark:text-primary-foreground">
              <UserIcon className="h-5 w-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                <UserIcon className="h-6 w-6 text-primary dark:text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium text-lg text-foreground">
                  {user.name}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                <Mail className="h-6 w-6 text-primary dark:text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium text-lg text-foreground">
                  {user.email}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Information Card */}
        <Card className="border-none shadow-lg bg-primary/5 dark:bg-primary/10">
          <CardHeader className="border-b border-primary/10 dark:border-primary/20">
            <CardTitle className="flex items-center gap-2 text-lg text-primary dark:text-primary-foreground">
              <Shield className="h-5 w-5" />
              Account Information
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary dark:text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Role</p>
                <p className="font-medium text-lg text-foreground capitalize">
                  {user.role}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-primary dark:text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Member Since</p>
                <p className="font-medium text-lg text-foreground">
                  {format(new Date(user.createdAt), "PPP")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-primary dark:text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Last Updated</p>
                <p className="font-medium text-lg text-foreground">
                  {format(new Date(user.updatedAt), "PPP")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
