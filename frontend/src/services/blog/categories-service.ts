import apiClient from "../api-client";
import {
  Category,
  CreateCategoryDto,
  UpdateCategoryDto,
} from "@/types/category";

export const categoriesService = {
  // Get all categories
  getAll: async (): Promise<Category[]> => {
    const response = await apiClient.get("/blogs/categories");
    return response.data.data;
  },

  // Get a single category by ID
  getById: async (id: string): Promise<Category> => {
    const response = await apiClient.get(`/blogs/categories/${id}`);
    return response.data.data;
  },

  // Get a single category by slug
  getBySlug: async (slug: string): Promise<Category> => {
    const response = await apiClient.get(`/blogs/categories/slug/${slug}`);
    return response.data.data;
  },

  // Create a new category
  create: async (category: CreateCategoryDto): Promise<Category> => {
    const response = await apiClient.post("/blogs/categories", category);
    return response.data.data;
  },

  // Update a category
  update: async (
    id: string,
    category: UpdateCategoryDto
  ): Promise<Category> => {
    const response = await apiClient.put(`/blogs/categories/${id}`, category);
    return response.data.data;
  },

  // Delete a category
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/blogs/categories/${id}`);
  },
};
