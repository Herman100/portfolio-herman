import React, { useState, useRef, useCallback } from "react";
import ReactQuill from "react-quill-new";
import { Progress } from "@/components/ui/progress";
import { IKContext, IKUpload } from "imagekitio-react";
import { imagekitConfig, imagekitService } from "@/services/imagekit-service";
import { Upload, Image, Video } from "lucide-react";

interface CustomQuillEditorProps {
  value?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
  className?: string;
}

/*
 * Custom toolbar component with ImageKit integration
 */
const CustomToolbar = ({
  onImageUpload,
  onVideoUpload,
  isUploading,
  uploadProgress,
}: {
  onImageUpload: () => void;
  onVideoUpload: () => void;
  isUploading: boolean;
  uploadProgress: number;
}) => (
  <div id="toolbar" className="flex items-center gap-2 p-2 border-b bg-gray-50">
    {/* Text formatting */}
    <select className="ql-header" defaultValue="">
      <option value="1">Heading 1</option>
      <option value="2">Heading 2</option>
      <option value="3">Heading 3</option>
      <option value="">Normal</option>
    </select>

    <select className="ql-font" defaultValue="sans-serif">
      <option value="sans-serif">Sans Serif</option>
      <option value="serif">Serif</option>
      <option value="monospace">Monospace</option>
    </select>

    <select className="ql-size" defaultValue="normal">
      <option value="small">Small</option>
      <option value="normal">Normal</option>
      <option value="large">Large</option>
      <option value="huge">Huge</option>
    </select>

    <div className="w-px h-6 bg-gray-300 mx-1" />

    {/* Basic formatting */}
    <button className="ql-bold" title="Bold" />
    <button className="ql-italic" title="Italic" />
    <button className="ql-underline" title="Underline" />
    <button className="ql-strike" title="Strikethrough" />

    <div className="w-px h-6 bg-gray-300 mx-1" />

    {/* Lists and quotes */}
    <button className="ql-blockquote" title="Blockquote" />
    <button className="ql-code-block" title="Code Block" />
    <button className="ql-list" value="ordered" title="Numbered List" />
    <button className="ql-list" value="bullet" title="Bullet List" />

    <div className="w-px h-6 bg-gray-300 mx-1" />

    {/* Alignment */}
    <select className="ql-align" defaultValue="">
      <option value="" />
      <option value="center" />
      <option value="right" />
      <option value="justify" />
    </select>

    <div className="w-px h-6 bg-gray-300 mx-1" />

    {/* Media buttons */}
    <button
      className="ql-image flex items-center justify-center w-8 h-8 rounded hover:bg-gray-200"
      onClick={onImageUpload}
      title="Upload Image"
      type="button"
    >
      <Image className="w-4 h-4" />
    </button>

    <button
      className="ql-video flex items-center justify-center w-8 h-8 rounded hover:bg-gray-200"
      onClick={onVideoUpload}
      title="Upload Video"
      type="button"
    >
      <Video className="w-4 h-4" />
    </button>

    <button className="ql-link" title="Insert Link" />
    <button className="ql-clean" title="Remove Formatting" />

    {/* Upload progress */}
    {isUploading && (
      <div className="flex items-center gap-2 ml-4">
        <span className="text-sm text-gray-600">Uploading...</span>
        <Progress value={uploadProgress} className="w-20" />
      </div>
    )}
  </div>
);

/*
 * Custom Image Upload Component
 */
const ImageUploadComponent = React.forwardRef<
  HTMLInputElement,
  {
    onUploadStart: () => void;
    onUploadProgress: (progress: { progress: number }) => void;
    onUploadComplete: (url: string) => void;
    onUploadError: () => void;
  }
>(
  (
    { onUploadStart, onUploadProgress, onUploadComplete, onUploadError },
    ref
  ) => {
    return (
      <IKUpload
        ref={ref}
        onUploadStart={onUploadStart}
        onUploadProgress={onUploadProgress}
        onSuccess={(res: { url: string }) => onUploadComplete(res.url)}
        onError={(err: { message: string }) => {
          console.error("Image upload error:", err.message);
          onUploadError();
        }}
        folder="/blog-images"
        useUniqueFileName={true}
        className="hidden"
        accept="image/*"
      />
    );
  }
);

/*
 * Custom Video Upload Component
 */
const VideoUploadComponent = React.forwardRef<
  HTMLInputElement,
  {
    onUploadStart: () => void;
    onUploadProgress: (progress: { progress: number }) => void;
    onUploadComplete: (url: string) => void;
    onUploadError: () => void;
  }
>(
  (
    { onUploadStart, onUploadProgress, onUploadComplete, onUploadError },
    ref
  ) => {
    return (
      <IKUpload
        ref={ref}
        onUploadStart={onUploadStart}
        onUploadProgress={onUploadProgress}
        onSuccess={(res: { url: string }) => onUploadComplete(res.url)}
        onError={(err: { message: string }) => {
          console.error("Video upload error:", err.message);
          onUploadError();
        }}
        folder="/blog-videos"
        useUniqueFileName={true}
        className="hidden"
        accept="video/*"
      />
    );
  }
);

/*
 * Main Custom Quill Editor Component
 */
const CustomQuillEditor: React.FC<CustomQuillEditorProps> = ({
  value = "",
  onChange,
  placeholder = "Start writing your content...",
  className = "",
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const quillRef = useRef<ReactQuill>(null);
  const imageUploadRef = useRef<HTMLInputElement>(null);
  const videoUploadRef = useRef<HTMLInputElement>(null);

  /*
   * Handle content changes
   */
  const handleChange = useCallback(
    (content: string) => {
      onChange?.(content);
    },
    [onChange]
  );

  /*
   * Insert media into editor at cursor position
   */
  const insertMedia = useCallback((url: string, type: "image" | "video") => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      const range = quill.getSelection(true);
      const index = range ? range.index : quill.getLength();

      if (type === "image") {
        quill.insertEmbed(index, "image", url, "user");
      } else {
        // For video, we'll insert HTML directly
        quill.insertEmbed(index, "video", url, "user");
      }

      quill.setSelection(index + 1);
      quill.focus();
    }
  }, []);

  /*
   * Upload handlers
   */
  const handleUploadStart = useCallback(() => {
    setIsUploading(true);
    setUploadProgress(0);
    // Disable editor during upload
    if (quillRef.current) {
      quillRef.current.getEditor().enable(false);
    }
  }, []);

  const handleUploadProgress = useCallback((progress: { progress: number }) => {
    setUploadProgress(progress.progress);
  }, []);

  const handleImageUploadComplete = useCallback(
    (url: string) => {
      insertMedia(url, "image");
      setIsUploading(false);
      setUploadProgress(0);
      // Re-enable editor
      if (quillRef.current) {
        quillRef.current.getEditor().enable(true);
      }
    },
    [insertMedia]
  );

  const handleVideoUploadComplete = useCallback(
    (url: string) => {
      insertMedia(url, "video");
      setIsUploading(false);
      setUploadProgress(0);
      // Re-enable editor
      if (quillRef.current) {
        quillRef.current.getEditor().enable(true);
      }
    },
    [insertMedia]
  );

  const handleUploadError = useCallback(() => {
    setIsUploading(false);
    setUploadProgress(0);
    // Re-enable editor
    if (quillRef.current) {
      quillRef.current.getEditor().enable(true);
    }
  }, []);

  /*
   * Trigger uploads
   */
  const triggerImageUpload = useCallback(() => {
    imageUploadRef.current?.click();
  }, []);

  const triggerVideoUpload = useCallback(() => {
    videoUploadRef.current?.click();
  }, []);

  /*
   * Quill modules configuration
   */
  const modules = {
    toolbar: {
      container: "#toolbar",
      handlers: {
        image: triggerImageUpload,
        video: triggerVideoUpload,
      },
    },
    clipboard: {
      matchVisual: false,
    },
  };

  /*
   * Quill formats
   */
  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "code-block",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "align",
    "direction",
    "color",
    "background",
  ];

  return (
    <div className={`custom-quill-editor ${className}`}>
      <IKContext
        publicKey={imagekitConfig.publicKey}
        urlEndpoint={imagekitConfig.urlEndpoint}
        authenticator={imagekitService.getImageKitAuth}
      >
        {/* Custom Toolbar */}
        <CustomToolbar
          onImageUpload={triggerImageUpload}
          onVideoUpload={triggerVideoUpload}
          isUploading={isUploading}
          uploadProgress={uploadProgress}
        />

        {/* Hidden Upload Components */}
        <ImageUploadComponent
          ref={imageUploadRef}
          onUploadStart={handleUploadStart}
          onUploadProgress={handleUploadProgress}
          onUploadComplete={handleImageUploadComplete}
          onUploadError={handleUploadError}
        />

        <VideoUploadComponent
          ref={videoUploadRef}
          onUploadStart={handleUploadStart}
          onUploadProgress={handleUploadProgress}
          onUploadComplete={handleVideoUploadComplete}
          onUploadError={handleUploadError}
        />

        {/* Quill Editor */}
        <ReactQuill
          ref={quillRef}
          theme="snow"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          modules={modules}
          formats={formats}
          style={{
            height: "400px",
            marginBottom: "42px", // Account for toolbar height
          }}
        />
      </IKContext>
    </div>
  );
};

export default CustomQuillEditor;
