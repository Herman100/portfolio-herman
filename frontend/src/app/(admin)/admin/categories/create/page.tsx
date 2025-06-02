"use client";

import { CategoryForm } from "@/components/admin/category-form";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function CreateCategoryPage() {
  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <SidebarTrigger className="-ml-1" />
          <div>
            <h1 className="text-3xl font-bold mb-2">Create Category</h1>
            <p className="text-gray-500">
              Add a new category to organize your blog content
            </p>
          </div>
        </div>
        <CategoryForm mode="create" />
      </div>
    </div>
  );
}
