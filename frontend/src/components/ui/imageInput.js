import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
import { ImageUpIcon, XIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
const ImageInput = ({ onChange, pImages, }) => {
    const MAX_IMAGES = 4;
    const [images, setImages] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);
    const processFile = useCallback((files) => {
        const newFiles = Array.from(files);
        newFiles.forEach((file) => {
            if (file.type.startsWith("image/") && images.length < MAX_IMAGES) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64String = reader.result;
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
    }, [images, MAX_IMAGES]);
    const removeImage = (id) => {
        setImages((prev) => {
            return prev.filter((img) => img.id !== id);
        });
    };
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setIsDragging(true);
        }
        else if (e.type === "dragleave") {
            setIsDragging(false);
        }
    };
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            processFile(e.dataTransfer.files);
        }
    };
    useEffect(() => {
        if (pImages)
            setImages(pImages);
    }, []);
    useEffect(() => {
        onChange(images.map((img) => img.file));
    }, [images]);
    return (_jsxs("div", { className: "upload-container w-full", children: [_jsxs("div", { onDragEnter: (e) => handleDrag(e), onDragLeave: (e) => handleDrag(e), onDragOver: (e) => handleDrag(e), onDrop: (e) => handleDrop(e), onClick: () => fileInputRef.current?.click(), className: cn("drop-zone relative w-full aspect-[5] ghost-border rounded-xl cursor-pointer flex flex-col items-center justify-center p-6 text-center transition-all", "glass", isDragging && !(images.length === MAX_IMAGES)
                    ? "border-primary bg-primary/5 glow-primary"
                    : "border-outline-variant", !(images.length === MAX_IMAGES) && "hover:border-primary"), children: [_jsx("input", { type: "file", name: "image", ref: fileInputRef, onChange: (e) => e.target.files && processFile(e.target.files), multiple: true, accept: "image/*", className: "hidden", disabled: images.length === MAX_IMAGES }), _jsx(ImageUpIcon, { className: "w-10 h-10 mb-3 text-on-surface-variant" }), _jsx("p", { className: cn("font-body text-sm text-on-surface", images.length === MAX_IMAGES && "!text-destructive"), children: "Click to upload or Drag & Drop" }), _jsxs("p", { className: cn("font-body text-xs text-on-surface-variant mt-1.5", images.length === MAX_IMAGES && "!text-destructive"), children: ["Max ", MAX_IMAGES, " images"] })] }), _jsx("div", { className: "w-full mt-2 grid grid-cols-4 gap-3 auto-rows-max", children: images.map((img) => (_jsxs("div", { className: "relative aspect-square rounded-md border border-outline-variant overflow-hidden group shadow-inner-soft bg-surface-container-low", children: [_jsx("img", { src: img.file, alt: "Upload Preview", className: "w-full h-full object-cover group-hover:scale-105 transition-transform" }), _jsx("button", { onClick: (e) => {
                                e.stopPropagation();
                                removeImage(img.id);
                            }, className: "absolute top-1.5 right-1.5 p-1.5 rounded-full bg-surface/80 text-on-surface-variant hover:text-secondary opacity-0 group-hover:opacity-100 transition-all active:scale-90 glass", children: _jsx(XIcon, { size: 14 }) })] }, img.id))) })] }));
};
export default ImageInput;
