import { Quill } from "react-quill-new";
import { IKUpload } from "@/services/imagekit-service";
import { UploadProgress } from "@/services/imagekit-service";
import { forwardRef } from "react";

const Inline = Quill.import("blots/inline") as any;
const Block = Quill.import("blots/block") as any;

class ImageBlot extends Inline {
  static create(value: string) {
    const node = super.create();
    node.setAttribute("src", value);
    node.setAttribute("class", "ql-image");
    return node;
  }

  static value(node: HTMLElement) {
    return node.getAttribute("src");
  }
}

class VideoBlot extends Block {
  static create(value: string) {
    const node = super.create();
    node.setAttribute("src", value);
    node.setAttribute("class", "ql-video");
    node.setAttribute("controls", "true");
    return node;
  }

  static value(node: HTMLElement) {
    return node.getAttribute("src");
  }
}

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

export const createUploadHandler = (
  quill: any,
  type: "image" | "video"
): UploadHandler => {
  return {
    onUploadStart: () => {
      quill.enable(false);
    },
    onUploadProgress: (progress) => {
      // You can show a progress indicator here
      console.log(`Upload progress: ${progress.progress}%`);
    },
    onUploadComplete: (url) => {
      const range = quill.getSelection(true);
      if (type === "image") {
        quill.insertEmbed(range.index, "image", url, "user");
        quill.setSelection(range.index + 1);
      } else {
        quill.insertEmbed(range.index, "video", url, "user");
        quill.setSelection(range.index + 1);
      }
      quill.enable(true);
    },
    onUploadError: (error) => {
      console.error("Upload error:", error);
      quill.enable(true);
    },
  };
};

export const ImageUploadButton = forwardRef<HTMLInputElement, { quill: any }>(
  ({ quill }, ref) => {
    const uploadHandler = createUploadHandler(quill, "image");

    return (
      <IKUpload
        ref={ref}
        onUploadStart={uploadHandler.onUploadStart}
        onUploadProgress={uploadHandler.onUploadProgress}
        onSuccess={(res: { url: string }) =>
          uploadHandler.onUploadComplete(res.url)
        }
        onError={(err: { message: string }) =>
          uploadHandler.onUploadError(err.message)
        }
        folder="/blog-images"
        useUniqueFileName={true}
      />
    );
  }
);

export const VideoUploadButton = forwardRef<HTMLInputElement, { quill: any }>(
  ({ quill }, ref) => {
    const uploadHandler = createUploadHandler(quill, "video");

    return (
      <IKUpload
        ref={ref}
        onUploadStart={uploadHandler.onUploadStart}
        onUploadProgress={uploadHandler.onUploadProgress}
        onSuccess={(res: { url: string }) =>
          uploadHandler.onUploadComplete(res.url)
        }
        onError={(err: { message: string }) =>
          uploadHandler.onUploadError(err.message)
        }
        folder="/blog-videos"
        useUniqueFileName={true}
      />
    );
  }
);
