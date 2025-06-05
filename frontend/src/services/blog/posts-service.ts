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
    const response = await apiClient.get("/posts/public/posts");
    return response.data.data;
  },

  // Get a single blog post by ID
  getById: async (id: string): Promise<BlogPost> => {
    const response = await apiClient.get(`/posts/${id}`);
    return response.data.data;
  },

  // Create a new blog post
  create: async (post: CreateBlogPostDto): Promise<BlogPost> => {
    const response = await apiClient.post("/posts", post);
    return response.data.data;
  },

  // Update a blog post
  update: async (id: string, post: UpdateBlogPostDto): Promise<BlogPost> => {
    const response = await apiClient.put(`/posts/${id}`, post);
    return response.data.data;
  },

  // Delete a blog post
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/posts/${id}`);
  },
};
