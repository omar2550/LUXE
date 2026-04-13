import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Trash2, Package, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import AppDialog from "@/components/AppDialog";
import { useCreateProduct, useDeleteProduct, useProducts, useUpdateProduct, } from "@/hooks/useProduct";
import { useState } from "react";
import AppAlertDialog from "@/components/AppAlertDialog";
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};
const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.5, ease: "easeOut" },
    },
};
const DashboardProducts = () => {
    const { data: products, isLoading } = useProducts();
    const { mutate, isPending, isSuccess } = useCreateProduct();
    const handelCreateProduct = (data) => {
        mutate(data);
    };
    const [product, setProduct] = useState(null);
    const { mutate: mutateDelete } = useDeleteProduct();
    const [openDelete, setOpenDelete] = useState(false);
    const handelDeleteProduct = (id) => {
        mutateDelete(id);
        setOpenDelete(false);
    };
    const onDelete = (product) => {
        setOpenDelete(true);
        setProduct(product);
    };
    const [openUpdate, setOpenUpdate] = useState(false);
    const { mutate: mutateUpdate } = useUpdateProduct();
    const handelUpdateProduct = (id, data) => {
        mutateUpdate({ id, data });
    };
    const onUpdate = (product) => {
        setOpenUpdate(true);
        setProduct(product);
    };
    return (_jsxs(motion.div, { variants: containerVariants, initial: "hidden", animate: "visible", className: "p-4 xs:p-6 space-y-8", children: [_jsx(AppDialog, { open: openUpdate, onOpenChange: () => setOpenUpdate(false), title: "Product Info", product: product, onSubmit: (data) => handelUpdateProduct(product?._id, data) }), _jsx(AppAlertDialog, { open: openDelete, onOpenChange: setOpenDelete, handelDeleteProduct: () => handelDeleteProduct(product?._id) }), _jsxs(motion.div, { variants: itemVariants, className: "flex flex-col gap-y-4 xs:flex-row justify-between items-center", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-display font-bold tracking-tightest bg-signature-gradient bg-clip-text text-transparent", children: "Inventory LUXE" }), _jsx("p", { className: "text-on-surface-variant text-sm mt-1", children: "Exclusive product management" })] }), _jsx(AppDialog, { title: "Add New Product", onSubmit: handelCreateProduct, disable: isPending, isSuccess: isSuccess, children: _jsxs(Button, { className: "bg-signature-gradient shadow-glow-primary hover:shadow-none transition-shadow duration-500 text-on-surface font-semibold gap-2 p-2 hover-scale w-full xs:w-fit flex", children: [_jsx(Plus, { size: 18 }), " Add Product"] }) })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: ["Total Assets", "Live Stock", "Low Supply"].map((label, i) => (_jsx(motion.div, { variants: itemVariants, whileHover: { y: -5 }, children: _jsxs(Card, { className: "glass ghost-border p-6 flex items-center gap-4 relative overflow-hidden group", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" }), _jsx("div", { className: "p-3 rounded-xl bg-primary/10 text-primary", children: _jsx(Package, { size: 24 }) }), _jsxs("div", { children: [_jsx("p", { className: "text-[10px] text-on-surface-variant uppercase tracking-widest", children: label }), _jsx("p", { className: "text-2xl font-display font-bold", children: "1,280" })] })] }) }, i))) }), _jsx(motion.div, { variants: itemVariants, children: _jsxs(Card, { className: "glass ghost-border shadow-ambient overflow-hidden", children: [_jsx("div", { className: "p-4 pt-2 border-b border-outline-variant", children: _jsxs("div", { className: "relative w-full md:w-80", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant", size: 16 }), _jsx(Input, { placeholder: "Search...", className: "pl-10 bg-surface-container-low border-none focus-visible:ring-1 focus-visible:ring-primary/50" })] }) }), _jsx("div", { className: "overflow-x-auto", children: _jsxs(Table, { children: [_jsx(TableHeader, { className: "bg-surface-container-lowest/50", children: _jsxs(TableRow, { className: "border-outline-variant hover:bg-transparent", children: [_jsx(TableHead, { className: "w-[300px]", children: "Product" }), _jsx(TableHead, { children: "Category" }), _jsx(TableHead, { children: "Price" }), _jsx(TableHead, { children: "Stock" }), _jsx(TableHead, { children: "Status" })] }) }), _jsx(TableBody, { children: _jsx(AnimatePresence, { children: products &&
                                                products?.map((product) => (_jsx(ProductRow, { product: product, onEdit: onUpdate, onDelete: onDelete }, product._id))) }) })] }) })] }) })] }));
};
export default DashboardProducts;
const ProductRow = ({ product, onEdit, onDelete, }) => {
    return (_jsxs(motion.tr, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, whileHover: { backgroundColor: "rgba(250 250 250, 0.03)" }, className: "border-outline-variant group transition-colors", children: [_jsx(TableCell, { className: "font-medium", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "size-10 rounded-lg bg-surface-container-highest ghost-border overflow-hidden", children: _jsx("img", { src: product?.images[0], alt: product?.name, className: "object-cover object-center h-full w-full rounded-sm" }) }), product.name] }) }), _jsx(TableCell, { className: "text-on-surface-variant text-xs", children: product.category }), _jsxs(TableCell, { className: "font-display font-semibold", children: ["$", product.price] }), _jsx(TableCell, { className: "font-display font-semibold", children: product.stock }), _jsxs(TableCell, { className: "text-on-surface/50", children: [_jsx(Edit, { size: 18, className: "inline-block mx-2 cursor-pointer hover:text-tertiary transition-all duration-300", onClick: () => onEdit(product) }), _jsx(Trash2, { size: 18, className: "inline-block cursor-pointer hover:text-destructive transition-all duration-300", onClick: () => onDelete(product) })] })] }, product._id));
};
