import apiClient from "../api-client";
import {
  BlogPost,
  CreateBlogPostDto,
  UpdateBlogPostDto,
  PaginatedBlogPosts,
} from "@/types/blog";

export const blogPostsService = {
  // Get all blog posts
  getAll: async (): Promise<BlogPost[]> => {
    const response = await apiClient.get("/blogs/public/blogs");
    return response.data.data;
  },

  // Get a single blog post by ID
  getById: async (id: string): Promise<BlogPost> => {
    const response = await apiClient.get(`/blogs/${id}`);
    return response.data.data;
  },

  // Create a new blog post
  create: async (post: CreateBlogPostDto): Promise<BlogPost> => {
    const response = await apiClient.post("/blogs", post);
    return response.data.data;
  },

  // Update a blog post
  update: async (id: string, post: UpdateBlogPostDto): Promise<BlogPost> => {
    const response = await apiClient.put(`/blogs/${id}`, post);
    return response.data.data;
  },

  // Delete a blog post
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/blogs/${id}`);
  },
};
