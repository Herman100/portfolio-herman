"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { BlogPost, PaginatedBlogPosts } from "@/types/blog";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { blogPostsService } from "@/services/blog/posts-service";
import { useToast } from "@/hooks/use-toast";
import LoadingSpinner from "@/components/ui/loading-spinner";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<PaginatedBlogPosts | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<BlogPost | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  const fetchBlogs = async (page: number) => {
    try {
      const data = await blogPostsService.getAll(page);
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      toast({
        title: "Error",
        description: "Failed to fetch all posts",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(currentPage);
  }, [currentPage]);

  const handleDelete = async (blogId: string) => {
    try {
      await blogPostsService.delete(blogId);
      fetchBlogs(currentPage);
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast({
        title: "Error",
        description: "Failed to delete post",
        variant: "destructive",
      });
    } finally {
      setDeleteDialogOpen(false);
      setBlogToDelete(null);
    }
  };

  const handleEdit = (blogId: string) => {
    router.push(`/admin/blogs/edit/${blogId}`);
  };

  const openDeleteDialog = (blog: BlogPost) => {
    setBlogToDelete(blog);
    setDeleteDialogOpen(true);
  };

  if (isLoading) {
    return <LoadingSpinner size="lg" color="primary" />;
  }

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <SidebarTrigger className="-ml-1" />
        <h1 className="text-2xl font-bold">Blogs</h1>
        <Button onClick={() => router.push("/admin/blogs/editor")}>
          Create New Blog
        </Button>
      </div>

      {/* Show message if no blogs found */}
      {blogs && blogs.blogs.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">
            No blogs found. Create your first blog!
          </p>
        </div>
      )}

      <div className="grid gap-4">
        {blogs?.blogs.map((blog: BlogPost) => (
          <Card key={blog._id} className="hover:shadow-lg transition-shadow">
            <div className="flex items-center p-4">
              {blog.coverImage && (
                <div className="w-32 h-24 mr-4 flex-shrink-0">
                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              )}
              <div className="flex-grow">
                <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                <p className="text-sm text-gray-500">
                  Created: {format(new Date(blog.createdAt), "PPP")}
                </p>
              </div>
              <div className="flex space-x-2 ml-4">
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
                  onClick={() => openDeleteDialog(blog)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {blogs && blogs.totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            disabled={currentPage === 0}
          >
            Previous
          </Button>
          <span className="py-2 px-4">
            Page {currentPage + 1} of {blogs.totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, blogs.totalPages - 1))
            }
            disabled={currentPage === blogs.totalPages - 1}
          >
            Next
          </Button>
        </div>
      )}

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Blog</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the blog &#34;
              {blogToDelete?.title}&#34;? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setDeleteDialogOpen(false);
                setBlogToDelete(null);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => blogToDelete && handleDelete(blogToDelete._id)}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
