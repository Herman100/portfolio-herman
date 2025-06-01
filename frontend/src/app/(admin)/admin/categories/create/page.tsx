"use client";

import { CategoryForm } from "@/components/admin/category-form";

export default function CreateCategoryPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Create Category</h1>
        <p className="text-gray-500 mb-8">
          Add a new category to organize your blog content
        </p>
        <CategoryForm mode="create" />
      </div>
    </div>
  );
}
