import apiClient from "../api-client";
import { Tag } from "@/types/tag";

export const tagsService = {
  // Get all tags
  getAll: async (): Promise<Tag[]> => {
    const response = await apiClient.get("/blogs/tags");
    return response.data.data;
  },

  // Get a single tag by ID
  getById: async (id: string): Promise<Tag> => {
    const response = await apiClient.get(`/blogs/tags/${id}`);
    return response.data.data;
  },

  // Create a new tag
  create: async (name: string): Promise<Tag> => {
    const response = await apiClient.post("/blogs/tags", { name });
    return response.data.data;
  },

  // Update a tag
  update: async (id: string, name: string): Promise<Tag> => {
    const response = await apiClient.put(`/blogs/tags/${id}`, { name });
    return response.data.data;
  },

  // Delete a tag
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/blogs/tags/${id}`);
  },
};
