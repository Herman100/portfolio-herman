"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { BlogPost } from "@/types/blog";
import { blogPostsService } from "@/services/blog/posts-service";
import { useToast } from "@/hooks/use-toast";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { format } from "date-fns";

export default function BlogPostPage() {
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const { toast } = useToast();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await blogPostsService.getById(params.id as string);
        setBlog(data);
      } catch (error) {
        console.error("Error fetching blog:", error);
        toast({
          title: "Error",
          description: "Failed to fetch blog post",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchBlog();
    }
  }, [params.id, toast]);

  if (isLoading) {
    return <LoadingSpinner size="lg" color="primary" />;
  }

  if (!blog) {
    return (
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Blog post not found
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <article className="max-w-4xl mx-auto">
        {blog.coverImage && (
          <div className="aspect-video w-full mb-8">
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        )}

        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
          <div className="flex items-center text-gray-500 text-sm">
            <time dateTime={new Date(blog.createdAt).toISOString()}>
              {format(new Date(blog.createdAt), "PPP")}
            </time>
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 ml-4">
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>

        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </article>
    </div>
  );
}
