import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import ImageInput from "./ui/imageInput";
import toast from "react-hot-toast";
const AppDialog = ({ children, title, onSubmit, disable, isSuccess, open, onOpenChange, product, }) => {
    const [formdata, setFormData] = useState({
        name: "",
        description: "",
        category: "",
        price: 0,
        stock: 0,
        isFeatured: false,
        images: [],
    });
    const isValid = (formdata.name.trim() !== "" &&
        formdata.category.trim() !== "" &&
        formdata.description.trim() !== "" &&
        formdata.price >= 0 &&
        formdata.stock >= 0 &&
        formdata.images.length > 0 &&
        formdata.name !== product?.name) ||
        formdata.category !== product?.category ||
        formdata.description !== product?.description ||
        formdata.price !== product?.price ||
        formdata.stock !== product?.stock ||
        formdata.isFeatured !== product?.isFeatured ||
        JSON.stringify(formdata.images) !== JSON.stringify(product?.images);
    const handleValidationAndSubmit = () => {
        if (!formdata.name.trim()) {
            toast.error("Name Filed is Required");
            return;
        }
        if (!formdata.category.trim()) {
            toast.error("Category Filed is Required");
            return;
        }
        if (formdata.price <= 0) {
            toast.error("Invalid Price");
            return;
        }
        if (formdata.stock <= 0) {
            toast.error("Invalid Stock");
            return;
        }
        if (formdata.images.length === 0) {
            toast.error("At Least Add One Image");
            return;
        }
        onSubmit(formdata);
    };
    useEffect(() => {
        if (product) {
            setFormData({
                name: product?.name,
                description: product?.description,
                category: product?.category,
                price: product?.price,
                stock: product?.stock,
                isFeatured: product?.isFeatured,
                images: product?.images,
            });
        }
        if (isSuccess) {
            setFormData({
                name: "",
                description: "",
                category: "",
                price: 0,
                stock: 0,
                isFeatured: false,
                images: [],
            });
        }
    }, [isSuccess, product]);
    return (_jsxs(Dialog, { open: open, onOpenChange: onOpenChange, children: [children && _jsx(DialogTrigger, { children: children }), _jsxs(DialogContent, { className: "glass ghost-border text-on-surface", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { className: "font-display", children: title }) }), _jsxs("div", { className: "grid gap-4", children: [_jsx(Input, { value: formdata.name, onChange: (e) => setFormData({ ...formdata, name: e.target.value }), placeholder: "Product Name", className: "bg-surface-container-low border-outline-variant" }), _jsx(Input, { value: formdata.category, onChange: (e) => setFormData({ ...formdata, category: e.target.value }), placeholder: "Category", className: "bg-surface-container-low border-outline-variant" }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsx(Input, { value: formdata.price, type: "number", onChange: (e) => setFormData({ ...formdata, price: Number(e.target.value) }), placeholder: "Price", className: "bg-surface-container-low border-outline-variant" }), _jsx(Input, { value: formdata.stock, type: "number", onChange: (e) => setFormData({ ...formdata, stock: Number(e.target.value) }), placeholder: "Stock Quantity", className: "bg-surface-container-low border-outline-variant" })] }), _jsxs(motion.label, { htmlFor: "is-featured", className: "flex items-center justify-between", whileTap: { scale: 0.99 }, children: [_jsx("p", { children: "Is Featured?" }), _jsx(Checkbox, { checked: formdata.isFeatured, onCheckedChange: (checked) => setFormData({ ...formdata, isFeatured: checked }), id: "is-featured", className: `
              size-5 border-on-surface-variant shadow-sm
              transition-all duration-300
            ` })] }), _jsx("textarea", { value: formdata.description, onChange: (e) => setFormData({ ...formdata, description: e.target.value }), name: "description", placeholder: "Product Description...", className: "w-full rounded-[10px] ghost-border bg-surface-container-low px-3 py-1 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm resize-none" }), _jsx(ImageInput, { pImages: product?.images.map((img) => {
                                    return { id: img, file: img };
                                }), onChange: (images) => {
                                    setFormData((prev) => ({ ...prev, images: images }));
                                } }), _jsx(DialogClose, { children: _jsx(Button, { className: "bg-primary text-surface font-bold p-2", onClick: handleValidationAndSubmit, disabled: disable || !isValid, children: "Add Product" }) })] })] })] }));
};
export default AppDialog;
