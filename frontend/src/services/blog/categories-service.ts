import apiClient from "../api-client";
import {
  Category,
  CreateCategoryDto,
  UpdateCategoryDto,
} from "@/types/category";

export const categoriesService = {
  // Get all categories
  getAll: async (): Promise<Category[]> => {
    const response = await apiClient.get("/blog/categories");
    return response.data.data;
  },

  // Get a single category by ID
  getById: async (id: string): Promise<Category> => {
    const response = await apiClient.get(`/blog/categories/${id}`);
    return response.data.data;
  },

  // Get a single category by slug
  getBySlug: async (slug: string): Promise<Category> => {
    const response = await apiClient.get(`/blog/categories/slug/${slug}`);
    return response.data.data;
  },

  // Create a new category
  create: async (category: CreateCategoryDto): Promise<Category> => {
    const response = await apiClient.post("/blog/categories", category);
    return response.data.data;
  },

  // Update a category
  update: async (
    id: string,
    category: UpdateCategoryDto
  ): Promise<Category> => {
    const response = await apiClient.put(`/blog/categories/${id}`, category);
    return response.data.data;
  },

  // Delete a category
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/blog/categories/${id}`);
  },
};
