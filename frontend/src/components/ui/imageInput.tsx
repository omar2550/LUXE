import { cn } from "@/lib/utils";
import { ImageUpIcon, XIcon } from "lucide-react";
import { DragEvent, useCallback, useEffect, useRef, useState } from "react";

interface Image {
  id: string;
  file: string;
}

const ImageInput = ({ onChange }: { onChange: (images: string[]) => void }) => {
  const MAX_IMAGES = 4;

  const [images, setImages] = useState<Image[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback(
    (files: FileList | File[]) => {
      const newFiles = Array.from(files);

      newFiles.forEach((file) => {
        if (file.type.startsWith("image/") && images.length < MAX_IMAGES) {
          const reader = new FileReader();

          reader.onloadend = () => {
            const base64String = reader.result as string;

            setImages((prev) => [
              ...prev,
              {
                id: crypto.randomUUID(),
                file: base64String,
              },
            ]);
          };

          reader.readAsDataURL(file);
        }
      });
    },
    [images, MAX_IMAGES],
  );

  const removeImage = (id: string) => {
    setImages((prev) => {
      return prev.filter((img) => img.id !== id);
    });
  };

  const handleDrag = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files);
    }
  };

  useEffect(() => {
    onChange(images.map((img) => img.file));
  }, [images]);

  return (
    <div className="upload-container w-full">
      <div
        onDragEnter={(e) => handleDrag(e)}
        onDragLeave={(e) => handleDrag(e)}
        onDragOver={(e) => handleDrag(e)}
        onDrop={(e) => handleDrop(e)}
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          "drop-zone relative w-full aspect-[5] ghost-border rounded-xl cursor-pointer flex flex-col items-center justify-center p-6 text-center transition-all",
          "glass",
          isDragging && !(images.length === MAX_IMAGES)
            ? "border-primary bg-primary/5 glow-primary"
            : "border-outline-variant",
          !(images.length === MAX_IMAGES) && "hover:border-primary",
        )}
      >
        <input
          type="file"
          name="image"
          ref={fileInputRef}
          onChange={(e) => e.target.files && processFile(e.target.files)}
          multiple
          accept="image/*"
          className="hidden"
          disabled={images.length === MAX_IMAGES}
        />
        <ImageUpIcon className="w-10 h-10 mb-3 text-on-surface-variant" />
        <p
          className={cn(
            "font-body text-sm text-on-surface",
            images.length === MAX_IMAGES && "!text-destructive",
          )}
        >
          Click to upload or Drag & Drop
        </p>
        <p
          className={cn(
            "font-body text-xs text-on-surface-variant mt-1.5",
            images.length === MAX_IMAGES && "!text-destructive",
          )}
        >
          Max {MAX_IMAGES} images
        </p>
      </div>

      {/* (Preview Grid) */}
      <div className="w-full mt-2 grid grid-cols-4 gap-3 auto-rows-max">
        {images.map((img) => (
          <div
            key={img.id}
            className="relative aspect-square rounded-md border border-outline-variant overflow-hidden group shadow-inner-soft bg-surface-container-low"
          >
            <img
              src={img.file}
              alt="Upload Preview"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeImage(img.id);
              }}
              className="absolute top-1.5 right-1.5 p-1.5 rounded-full bg-surface/80 text-on-surface-variant hover:text-secondary opacity-0 group-hover:opacity-100 transition-all active:scale-90 glass"
            >
              <XIcon size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageInput;
