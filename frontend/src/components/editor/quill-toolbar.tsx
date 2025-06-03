import { useRef } from "react";
import { ImageUploadButton, VideoUploadButton } from "./quill-upload-module";
import { Button } from "@/components/ui/button";
import { Image, Video } from "lucide-react";

interface QuillToolbarProps {
  quill: any;
}

export const QuillToolbar = ({ quill }: QuillToolbarProps) => {
  const imageUploadRef = useRef<HTMLInputElement>(null);
  const videoUploadRef = useRef<HTMLInputElement>(null);

  return (
    <div id="toolbar" className="flex items-center gap-2 p-2 border-b">
      <select className="ql-header">
        <option value="1">Heading 1</option>
        <option value="2">Heading 2</option>
        <option value="3">Heading 3</option>
        <option value="4">Heading 4</option>
        <option value="5">Heading 5</option>
        <option value="6">Heading 6</option>
        <option value="">Normal</option>
      </select>

      <select className="ql-font">
        <option value="sans-serif">Sans Serif</option>
        <option value="serif">Serif</option>
        <option value="monospace">Monospace</option>
      </select>

      <select className="ql-size">
        <option value="small">Small</option>
        <option value="normal">Normal</option>
        <option value="large">Large</option>
        <option value="huge">Huge</option>
      </select>

      <button className="ql-bold" />
      <button className="ql-italic" />
      <button className="ql-underline" />
      <button className="ql-strike" />

      <button className="ql-blockquote" />
      <button className="ql-code-block" />

      <button className="ql-list" value="ordered" />
      <button className="ql-list" value="bullet" />

      <button className="ql-script" value="super" />
      <button className="ql-script" value="sub" />

      <button className="ql-indent" value="-1" />
      <button className="ql-indent" value="+1" />

      <button className="ql-direction" value="rtl" />

      <select className="ql-align">
        <option value="" />
        <option value="center" />
        <option value="right" />
        <option value="justify" />
      </select>

      <button className="ql-link" />
      <button className="ql-clean" />

      <div className="flex items-center gap-2 ml-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => imageUploadRef.current?.click()}
        >
          <Image className="h-4 w-4" />
        </Button>
        <ImageUploadButton quill={quill} ref={imageUploadRef} />

        <Button
          variant="ghost"
          size="icon"
          onClick={() => videoUploadRef.current?.click()}
        >
          <Video className="h-4 w-4" />
        </Button>
        <VideoUploadButton quill={quill} ref={videoUploadRef} />
      </div>
    </div>
  );
};
