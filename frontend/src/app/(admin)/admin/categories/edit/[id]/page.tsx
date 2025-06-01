"use client";

import { useEffect, useState } from "react";
import { CategoryForm } from "../../../../../../components/admin/category-form";
import { Category } from "@/types/category";
import { categoriesService } from "@/services/blog/categories-service";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/ui/loading-spinner";

interface EditCategoryPageProps {
  params: {
    id: string;
  };
}

export default function EditCategoryPage({ params }: EditCategoryPageProps) {
  const [category, setCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const data = await categoriesService.getById(params.id);
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
    <div className="container mx-auto py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Edit Category</h1>
        <p className="text-gray-500 mb-8">Update the category information</p>
        <CategoryForm mode="update" category={category} />
      </div>
    </div>
  );
}
