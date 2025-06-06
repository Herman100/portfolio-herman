import apiClient from "../api-client";
import {
  BlogPost,
  CreateBlogPostDto,
  UpdateBlogPostDto,
  PaginatedBlogPosts,
} from "@/types/blog";

export const blogPostsService = {
  // Get all blog public posts
  getAllPublic: async (
    page: number = 0,
    limit: number = 10,
    category?: string
  ): Promise<PaginatedBlogPosts> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    if (category) {
      params.append("category", category);
    }
    const response = await apiClient.get(`/posts/public?${params.toString()}`);
    return response.data.data;
  },

  getPublicBlogById: async (id: string): Promise<BlogPost> => {
    const response = await apiClient.get(`/posts/public/${id}`);
    return response.data.data;
  },

  // Get all blog posts
  getAll: async (page: number): Promise<PaginatedBlogPosts> => {
    const response = await apiClient.get(`/posts?page=${page}&limit=10`);
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
