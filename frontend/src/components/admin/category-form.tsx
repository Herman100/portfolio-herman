"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Category } from "@/types/category";
import { categoriesService } from "@/services/blog/categories-service";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

// Define the form schema using Zod
const categoryFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  description: z
    .string()
    .max(200, "Description must be less than 200 characters")
    .optional(),
});

// Infer the type from the schema
type CategoryFormValues = z.infer<typeof categoryFormSchema>;

interface CategoryFormProps {
  category?: Category;
  mode: "create" | "update";
}

export function CategoryForm({ category, mode }: CategoryFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const isUpdate = mode === "update";

  // Initialize form with default values
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: category?.name || "",
    },
  });

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      if (isUpdate && category) {
        await categoriesService.update(category._id, data);
        toast({
          title: "Success",
          description: "Category updated successfully",
        });
      } else {
        await categoriesService.create(data);
        toast({
          title: "Success",
          description: "Category created successfully",
        });
      }
      router.push("/admin/categories");
      router.refresh();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
      console.error("Error submitting category:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter category name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter category description"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/categories")}
          >
            Cancel
          </Button>
          <Button type="submit">
            {isUpdate ? "Update Category" : "Create Category"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
