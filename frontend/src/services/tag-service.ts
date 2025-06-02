import apiClient from "./api-client";
import { Tag, CreateTagDto, UpdateTagDto } from "@/types/tag";

export const tagService = {
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
  create: async (tag: CreateTagDto): Promise<Tag> => {
    const response = await apiClient.post("/blogs/tags", tag);
    return response.data.data;
  },

  // Update a tag
  update: async (id: string, tag: UpdateTagDto): Promise<Tag> => {
    const response = await apiClient.put(`/blogs/tags/${id}`, tag);
    return response.data.data;
  },

  // Delete a tag
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/blogs/tags/${id}`);
  },
};
