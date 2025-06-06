"use client";

import "react-quill-new/dist/quill.snow.css";
import { useEffect, useRef, useState } from "react";
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
import { X, Upload } from "lucide-react";
import { imagekitConfig, imagekitService } from "@/services/imagekit-service";
import { Progress } from "@/components/ui/progress";
import { IKContext, IKUpload } from "imagekitio-react";
import CustomQuillEditor from "@/components/editor/quill-toolbar";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  category: z.string().min(1, "Category is required"),
  tags: z.array(z.string()),
  coverImage: z.string().optional(),
  author: z.string().min(1, "Author is required"),
});

type FormData = z.infer<typeof formSchema>;

export default function EditorPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const uploadRef = useRef<HTMLInputElement>(null);
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
      category: "",
      tags: [],
      content: "",
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
    const tag = tags.find((t) => t._id === tagId);
    if (!tag) return;

    if (currentTags.includes(tag.name)) {
      setValue(
        "tags",
        currentTags.filter((name) => name !== tag.name)
      );
    } else {
      setValue("tags", [...currentTags, tag.name]);
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

  const handleCoverImageUpload = {
    onUploadStart: () => {
      setIsUploading(true);
      setUploadProgress(0);
    },
    onUploadProgress: (progress: number) => {
      setUploadProgress(progress);
    },
    onSuccess: (res: { url: string }) => {
      setValue("coverImage", res.url);
      setIsUploading(false);
      toast({
        title: "Success",
        description: "Cover image uploaded successfully",
      });
    },
    onError: (err: Error) => {
      setIsUploading(false);
      toast({
        title: "Error",
        description: "Failed to upload cover image",
        variant: "destructive",
      });
    },
  };

  // Handle content changes from the custom editor
  const handleContentChange = (content: string) => {
    setValue("content", content);
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
          <Label htmlFor="author">Author</Label>
          <Input
            id="author"
            {...register("author")}
            placeholder="Enter author name"
          />
          {errors.author && (
            <p className="text-sm text-red-500">{errors.author.message}</p>
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
                <SelectItem key={category._id} value={category.name}>
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
                variant={
                  selectedTags.includes(tag.name) ? "default" : "outline"
                }
                className="cursor-pointer"
                onClick={() => toggleTag(tag._id)}
              >
                {tag.name}
                {selectedTags.includes(tag.name) && (
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
          <Label>Cover Image</Label>
          <div className="flex items-center gap-4">
            {watch("coverImage") && (
              <img
                src={watch("coverImage")}
                alt="Cover"
                className="w-32 h-32 object-cover rounded-md"
              />
            )}
            <div className="flex-1">
              <IKContext
                publicKey={imagekitConfig.publicKey}
                urlEndpoint={imagekitConfig.urlEndpoint}
                authenticator={imagekitService.getImageKitAuth}
              >
                <IKUpload
                  ref={uploadRef}
                  onUploadStart={handleCoverImageUpload.onUploadStart}
                  onUploadProgress={handleCoverImageUpload.onUploadProgress}
                  onSuccess={handleCoverImageUpload.onSuccess}
                  onError={handleCoverImageUpload.onError}
                  useUniqueFileName={true}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  disabled={isUploading}
                  className="cursor-pointer"
                  onClick={() => uploadRef.current?.click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {watch("coverImage")
                    ? "Change Cover Photo"
                    : "Upload Cover Image"}
                </Button>
              </IKContext>
              {isUploading && (
                <Progress value={uploadProgress} className="mt-2" />
              )}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Content</Label>
          <div className="border rounded-md">
            <CustomQuillEditor
              value={watch("content") || ""}
              onChange={handleContentChange}
              placeholder="Start writing your blog post content..."
              className="min-h-[400px]"
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
