"use client";

import { useEffect, useState } from "react";
import { CategoryForm } from "../../../../../../components/admin/category-form";
import { Category } from "@/types/category";
import { categoriesService } from "@/services/blog/categories-service";
import { useParams, useRouter } from "next/navigation";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface EditCategoryPageProps {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function EditCategoryPage() {
  const [category, setCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const fetchCategory = async () => {
      const id = Array.isArray(params.id) ? params.id[0] : params.id;
      if (!id) return;
      try {
        const data = await categoriesService.getById(id);
        setCategory(data);
      } catch (error) {
        console.error("Error fetching category:", error);
        router.push("/admin/categories");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategory();
  }, [params.id, router]);

  if (isLoading) {
    return <LoadingSpinner size="lg" color="primary" />;
  }

  if (!category) {
    return null;
  }

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <SidebarTrigger className="-ml-1" />
          <div>
            <h1 className="text-3xl font-bold mb-2">Edit Category</h1>
            <p className="text-gray-500">Update the category information</p>
          </div>
        </div>
        <CategoryForm mode="update" category={category} />
      </div>
    </div>
  );
}
