import { IKContext, IKUpload } from "imagekitio-react";

export interface UploadProgress {
  progress: number;
  status: "uploading" | "completed" | "error";
  error?: string;
}

export interface ImageKitConfig {
  urlEndpoint: string;
  publicKey: string;
  authenticationEndpoint: string;
}

export const imagekitConfig: ImageKitConfig = {
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "",
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "",
  authenticationEndpoint: "/api/imagekit/auth",
};

export const imagekitService = {
  getImageUrl: (path: string, transformation?: string) => {
    return `${imagekitConfig.urlEndpoint}/${path}${transformation || ""}`;
  },
};

export { IKContext, IKUpload };
