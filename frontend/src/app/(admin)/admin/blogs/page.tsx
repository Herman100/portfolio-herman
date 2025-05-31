"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Blog, PaginatedBlogs } from "@/types/blog";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<PaginatedBlogs | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchBlogs = async (page: number) => {
    try {
      const response = await fetch(`/api/blogs?page=${page}&limit=10`);
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(currentPage);
  }, [currentPage]);

  const handleDelete = async (blogId: string) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await fetch(`/api/blogs/${blogId}`, {
          method: "DELETE",
        });
        fetchBlogs(currentPage);
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
  };

  const handleEdit = (blogId: string) => {
    router.push(`/admin/blogs/edit/${blogId}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Blogs</h1>
        <Button onClick={() => router.push("/admin/blogs/create")}>
          Create New Blog
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogs?.blogs.map((blog) => (
          <Card key={blog._id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl">{blog.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">
                  Published: {format(new Date(blog.publishedAt), "PPP")}
                </p>
                <p className="text-sm text-gray-500">
                  Author: {blog.author.name}
                </p>
                <div className="flex justify-end space-x-2 mt-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(blog._id)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(blog._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {blogs && blogs.totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="py-2 px-4">
            Page {currentPage} of {blogs.totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, blogs.totalPages))
            }
            disabled={currentPage === blogs.totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
