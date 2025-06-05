"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BlogPost, PaginatedBlogPosts } from "@/types/blog";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { blogPostsService } from "@/services/blog/posts-service";
import { useToast } from "@/hooks/use-toast";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export default function PublicBlogsPage() {
  const [blogs, setBlogs] = useState<PaginatedBlogPosts | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  const fetchBlogs = async (page: number) => {
    try {
      const data = await blogPostsService.getAllPublic();
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      toast({
        title: "Error",
        description: "Failed to fetch blog posts",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(currentPage);
  }, [currentPage]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-12">
        <LoadingSpinner size="lg" color="primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-foreground mb-4">
            Latest Stories
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover insights, stories, and ideas that matter to you
          </p>
        </div>

        {/* No blogs message */}
        {blogs && blogs.blogs.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
              <Calendar className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-2">
              No posts yet
            </h3>
            <p className="text-muted-foreground">
              Check back soon for new content!
            </p>
          </div>
        )}

        {/* Blog Grid */}
        <div className="grid gap-8 max-w-4xl mx-auto">
          {blogs?.blogs.map((blog: BlogPost, index: number) => (
            <Card
              key={blog._id}
              className="group overflow-hidden bg-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              onClick={() => router.push(`/blogs/${blog._id}`)}
            >
              <div className="flex flex-col md:flex-row">
                {/* Cover Image */}
                <div className="md:w-2/5 h-64 md:h-auto relative overflow-hidden">
                  {blog.coverImage ? (
                    <img
                      src={blog.coverImage}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <div className="text-muted-foreground text-center">
                        <div className="w-16 h-16 mx-auto mb-2 bg-muted rounded-full flex items-center justify-center">
                          <Calendar className="w-8 h-8" />
                        </div>
                        <p className="text-sm font-medium">No Image</p>
                      </div>
                    </div>
                  )}

                  {/* Overlay gradient for better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="md:w-3/5 p-8 flex flex-col justify-between">
                  <div>
                    {/* Meta Info */}
                    <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {format(new Date(blog.createdAt), "MMM dd, yyyy")}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>5 min read</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-200 line-clamp-2">
                      {blog.title}
                    </h2>

                    {/* Content Preview */}
                    <div className="text-muted-foreground mb-6 line-clamp-3">
                      <p>
                        {blog.content.replace(/<[^>]*>/g, "").slice(0, 150)}
                        {blog.content.length > 150 ? "..." : ""}
                      </p>
                    </div>
                  </div>

                  {/* Tags and Read More */}
                  <div>
                    {/* Tags */}
                    {blog.tags && blog.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {blog.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                          >
                            {tag}
                          </span>
                        ))}
                        {blog.tags.length > 3 && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                            +{blog.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    )}

                    {/* Read More Button */}
                    <div className="flex items-center text-primary font-semibold group-hover:text-primary/80 transition-colors">
                      <span>Read More</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/*  Pagination */}
        {blogs && blogs.totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-16">
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="hover:bg-muted"
            >
              Previous
            </Button>

            {/* Page numbers */}
            <div className="flex gap-1 mx-4">
              {Array.from({ length: blogs.totalPages }, (_, i) => i + 1).map(
                (pageNum) => {
                  if (
                    pageNum === 1 ||
                    pageNum === blogs.totalPages ||
                    (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                  ) {
                    return (
                      <Button
                        key={pageNum}
                        variant={
                          pageNum === currentPage ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                        className={
                          pageNum === currentPage
                            ? "bg-primary hover:bg-primary/90"
                            : "hover:bg-muted"
                        }
                      >
                        {pageNum}
                      </Button>
                    );
                  } else if (
                    pageNum === currentPage - 2 ||
                    pageNum === currentPage + 2
                  ) {
                    return (
                      <span
                        key={pageNum}
                        className="px-2 py-1 text-muted-foreground"
                      >
                        ...
                      </span>
                    );
                  }
                  return null;
                }
              )}
            </div>

            <Button
              variant="outline"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, blogs.totalPages))
              }
              disabled={currentPage === blogs.totalPages}
              className="hover:bg-muted"
            >
              Next
            </Button>
          </div>
        )}

        {/* Page info */}
        {blogs && (
          <div className="text-center text-sm text-muted-foreground mt-6">
            Showing {blogs.blogs.length} of {blogs.total} posts
          </div>
        )}
      </div>
    </div>
  );
}
