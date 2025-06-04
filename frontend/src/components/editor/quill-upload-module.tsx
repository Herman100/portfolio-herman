import { Quill } from "react-quill-new";
import { IKUpload } from "@/services/imagekit-service";
import { UploadProgress } from "@/services/imagekit-service";
import { forwardRef } from "react";

const Inline = Quill.import("blots/inline") as any;
const Block = Quill.import("blots/block") as any;

/*
 * Enhanced Image Blot with better styling and responsiveness
 */
class ImageBlot extends Inline {
  static create(value: string) {
    const node = super.create();
    node.setAttribute("src", value);
    node.setAttribute("class", "ql-image");
    node.setAttribute(
      "style",
      "max-width: 100%; height: auto; border-radius: 4px; margin: 8px 0;"
    );
    node.setAttribute("loading", "lazy");
    return node;
  }

  static value(node: HTMLElement) {
    return node.getAttribute("src");
  }

  static formats(node: HTMLElement) {
    return {
      src: node.getAttribute("src"),
      alt: node.getAttribute("alt"),
      width: node.getAttribute("width"),
      height: node.getAttribute("height"),
    };
  }
}

/*
 * Enhanced Video Blot with better controls and styling
 */
class VideoBlot extends Block {
  static create(value: string) {
    const node = super.create();
    node.setAttribute("src", value);
    node.setAttribute("class", "ql-video");
    node.setAttribute("controls", "true");
    node.setAttribute(
      "style",
      "max-width: 100%; height: auto; border-radius: 4px; margin: 8px 0;"
    );
    node.setAttribute("preload", "metadata");
    return node;
  }

  static value(node: HTMLElement) {
    return node.getAttribute("src");
  }

  static formats(node: HTMLElement) {
    return {
      src: node.getAttribute("src"),
      controls: node.getAttribute("controls"),
      width: node.getAttribute("width"),
      height: node.getAttribute("height"),
    };
  }
}

// Register custom blots
ImageBlot.blotName = "image";
ImageBlot.tagName = "img";

VideoBlot.blotName = "video";
VideoBlot.tagName = "video";

Quill.register(ImageBlot);
Quill.register(VideoBlot);

export interface UploadHandler {
  onUploadStart: () => void;
  onUploadProgress: (progress: UploadProgress) => void;
  onUploadComplete: (url: string) => void;
  onUploadError: (error: string) => void;
}

interface UploadButtonProps {
  quill: any;
  onUploadStart?: () => void;
  onUploadProgress?: (progress: UploadProgress) => void;
  onUploadComplete?: (url?: string) => void;
  onUploadError?: (error?: string) => void;
  folder?: string;
  acceptedTypes?: string;
}

/*
 * Enhanced Image Upload Button with better error handling
 */
export const ImageUploadButton = forwardRef<
  HTMLInputElement,
  UploadButtonProps
>(
  (
    {
      quill,
      onUploadStart,
      onUploadProgress,
      onUploadComplete,
      onUploadError,
      folder = "/blog-images",
      acceptedTypes = "image/*",
    },
    ref
  ) => {
    const handleUploadStart = () => {
      if (quill) {
        quill.enable(false);
      }
      onUploadStart?.();
    };

    const handleUploadProgress = (progress: UploadProgress) => {
      onUploadProgress?.(progress);
    };

    const handleUploadComplete = (url: string) => {
      if (quill) {
        const range = quill.getSelection(true);
        const index = range ? range.index : quill.getLength();

        // Insert image with proper formatting
        quill.insertEmbed(index, "image", url, "user");
        quill.setSelection(index + 1);
        quill.enable(true);
        quill.focus();
      }
      onUploadComplete?.(url);
    };

    const handleUploadError = (error: string) => {
      console.error("Image upload error:", error);
      if (quill) {
        quill.enable(true);
      }
      onUploadError?.(error);
    };

    return (
      <IKUpload
        ref={ref}
        onUploadStart={handleUploadStart}
        onUploadProgress={handleUploadProgress}
        onSuccess={(res: { url: string }) => handleUploadComplete(res.url)}
        onError={(err: { message: string }) => handleUploadError(err.message)}
        folder={folder}
        useUniqueFileName={true}
        className="hidden"
        accept={acceptedTypes}
      />
    );
  }
);

/*
 * Enhanced Video Upload Button with better error handling
 */
export const VideoUploadButton = forwardRef<
  HTMLInputElement,
  UploadButtonProps
>(
  (
    {
      quill,
      onUploadStart,
      onUploadProgress,
      onUploadComplete,
      onUploadError,
      folder = "/blog-videos",
      acceptedTypes = "video/*",
    },
    ref
  ) => {
    const handleUploadStart = () => {
      if (quill) {
        quill.enable(false);
      }
      onUploadStart?.();
    };

    const handleUploadProgress = (progress: UploadProgress) => {
      onUploadProgress?.(progress);
    };

    const handleUploadComplete = (url: string) => {
      if (quill) {
        const range = quill.getSelection(true);
        const index = range ? range.index : quill.getLength();

        // Insert video with proper formatting
        quill.insertEmbed(index, "video", url, "user");
        quill.setSelection(index + 1);
        quill.enable(true);
        quill.focus();
      }
      onUploadComplete?.(url);
    };

    const handleUploadError = (error: string) => {
      console.error("Video upload error:", error);
      if (quill) {
        quill.enable(true);
      }
      onUploadError?.(error);
    };

    return (
      <IKUpload
        ref={ref}
        onUploadStart={handleUploadStart}
        onUploadProgress={handleUploadProgress}
        onSuccess={(res: { url: string }) => handleUploadComplete(res.url)}
        onError={(err: { message: string }) => handleUploadError(err.message)}
        folder={folder}
        useUniqueFileName={true}
        className="hidden"
        accept={acceptedTypes}
      />
    );
  }
);

/*
 * Utility function to insert custom content into Quill
 */
export const insertCustomContent = (quill: any, type: string, content: any) => {
  if (!quill) return;

  const range = quill.getSelection(true);
  const index = range ? range.index : quill.getLength();

  switch (type) {
    case "image":
      quill.insertEmbed(index, "image", content, "user");
      break;
    case "video":
      quill.insertEmbed(index, "video", content, "user");
      break;
    case "text":
      quill.insertText(index, content, "user");
      break;
    default:
      console.warn("Unknown content type:", type);
  }

  quill.setSelection(index + 1);
  quill.focus();
};

/*
 * Utility function to get Quill editor content in different formats
 */
export const getQuillContent = (quill: any) => {
  if (!quill) return null;

  return {
    html: quill.root.innerHTML,
    text: quill.getText(),
    delta: quill.getContents(),
    length: quill.getLength(),
  };
};

/*
 * Utility function to set Quill editor content
 */
export const setQuillContent = (
  quill: any,
  content: string,
  format: "html" | "text" | "delta" = "html"
) => {
  if (!quill) return;

  switch (format) {
    case "html":
      quill.root.innerHTML = content;
      break;
    case "text":
      quill.setText(content);
      break;
    case "delta":
      quill.setContents(JSON.parse(content));
      break;
    default:
      console.warn("Unknown format:", format);
  }
};
