"use client";

import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { categoriesService } from "@/services/blog/categories-service";
import { tagsService } from "@/services/blog/tags-service";
import { blogPostsService } from "@/services/blog/posts-service";
import { Category } from "@/types/category";
import { Tag } from "@/types/tag";
import { CreateBlogPostDto } from "@/types/blog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  category: z.string().min(1, "Category is required"),
  tags: z.array(z.string()),
  coverImage: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function EditorPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "general",
      tags: [],
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesData, tagsData] = await Promise.all([
          categoriesService.getAll(),
          tagsService.getAll(),
        ]);
        setCategories(categoriesData);
        setTags(tagsData);
      } catch (error) {
        console.error(error);
        toast({
          title: "Error",
          description: "Failed to fetch data",
          variant: "destructive",
        });
      }
    };

    fetchData();
  }, [toast]);

  const selectedTags = watch("tags");

  const toggleTag = (tagId: string) => {
    const currentTags = watch("tags");
    if (currentTags.includes(tagId)) {
      setValue(
        "tags",
        currentTags.filter((id) => id !== tagId)
      );
    } else {
      setValue("tags", [...currentTags, tagId]);
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      await blogPostsService.create(data as CreateBlogPostDto);
      toast({
        title: "Success",
        description: "Blog post created successfully",
      });
      router.push("/admin/blogs");
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to create blog post",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6 px-2 sm:px-6">
      <h1 className="text-2xl font-bold">Create New Blog Post</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            {...register("title")}
            placeholder="Enter post title"
          />
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select
            onValueChange={(value: string) => setValue("category", value)}
            defaultValue="general"
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category._id} value={category._id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.category && (
            <p className="text-sm text-red-500">{errors.category.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Tags</Label>
          <div className="flex flex-wrap gap-2 p-2 border rounded-md min-h-[42px]">
            {tags.map((tag) => (
              <Badge
                key={tag._id}
                variant={selectedTags.includes(tag._id) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleTag(tag._id)}
              >
                {tag.name}
                {selectedTags.includes(tag._id) && (
                  <X className="ml-1 h-3 w-3" />
                )}
              </Badge>
            ))}
          </div>
          {errors.tags && (
            <p className="text-sm text-red-500">{errors.tags.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="coverImage">Cover Image URL (Optional)</Label>
          <Input
            id="coverImage"
            {...register("coverImage")}
            placeholder="Enter cover image URL"
          />
        </div>

        <div className="space-y-2">
          <Label>Content</Label>
          <div className="h-[400px] border rounded-md">
            <ReactQuill
              theme="snow"
              value={watch("content")}
              onChange={(content) => setValue("content", content)}
              className="h-[350px] p-4"
            />
          </div>
          {errors.content && (
            <p className="text-sm text-red-500">{errors.content.message}</p>
          )}
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Post"}
        </Button>
      </form>
    </div>
  );
}
