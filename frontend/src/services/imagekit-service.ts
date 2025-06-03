import { IKContext, IKUpload } from "imagekitio-react";
import apiClient from "./api-client";

export interface UploadProgress {
  progress: number;
  status: "uploading" | "completed" | "error";
  error?: string;
}

export interface ImageKitConfig {
  urlEndpoint: string;
  publicKey: string;
}

export const imagekitConfig: ImageKitConfig = {
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
};

export const imagekitService = {
  getImageKitAuth: async (): Promise<{
    signature: string;
    token: string;
    expire: number;
  }> => {
    try {
      const response = await apiClient.get("/imagekit/upload-image-video");
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching authentication parameters:", error);
      throw new Error("Failed to fetch authentication parameters");
    }
  },
};

export { IKContext, IKUpload };
