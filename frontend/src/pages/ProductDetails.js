import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAddToCart } from "@/hooks/useCart";
import { useProduct } from "@/hooks/useProduct";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
const ProductDetails = () => {
    const { id } = useParams();
    const { data: product, isLoading } = useProduct(id);
    const [image, setImage] = useState(product?.images[0]);
    // Will be Active Soon
    const [color, setColor] = useState("red");
    // product[0].colors[0]
    const { mutate, isPending } = useAddToCart();
    const handelAddToCart = () => {
        mutate(id);
    };
    const isProductInCart = () => { };
    return (_jsx("section", { className: "bg-surface px-2 py-8 sm:pl-4 sm:pr-8 sm:py-16", children: _jsxs("div", { className: "sm:grid grid-cols-2 gap-12", children: [_jsxs("div", { children: [isLoading ? (_jsx(Skeleton, { className: "aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/5] object-cover object-center w-full rounded-md ghost-border !border-2 sm:!border-4 shadow-inner" })) : (_jsx("img", { src: image || product?.images[0], alt: "image", className: "aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/5] object-cover object-center w-full rounded-md ghost-border !border-2 sm:!border-4 shadow-inner" })), _jsx("div", { className: "grid grid-cols-3 gap-2 mt-5", children: product?.images.map((img) => (_jsx("img", { src: img, alt: "img", className: "rounded-md ghost-border !border-2 sm:!border-4 cursor-pointer", onClick: () => setImage(img) }, img))) })] }), _jsxs("div", { className: "mt-6 sm:mt-0", children: [isLoading ? (_jsx(Skeleton, { className: "h-4 w-1/3 mb-2" })) : (_jsx("h3", { className: "text-3xl font-bold", children: product?.name })), _jsxs("div", { className: "flex items-center gap-1", children: [isLoading ? (_jsx(Skeleton, { className: "h-4 w-1/3" })) : (_jsxs("p", { className: "text-lg text-primary", children: ["$", product?.price.toFixed(2)] })), isLoading ? (_jsx(Skeleton, { className: "h-4 w-1/3" })) : (_jsx("p", { className: "line-through text-muted", children: "$111" }))] }), isLoading ? (_jsx(Skeleton, { className: "h-4 w-full my-6" })) : (_jsx("p", { className: "text-sm text-on-surface/50 leading-6 my-6", children: product?.description })), _jsxs("div", { children: [_jsx("p", { className: "text-body-sm text-on-surface/50", children: "Select Finish" }), _jsx("div", { className: "flex items-center gap-3", children: isLoading
                                        ? ["", "", "", ""].map((c, i) => (_jsx(Skeleton, { className: `w-5 h-5 mt-3 p-1 cursor-pointer rounded-full border-8 border-transparent outline ${color === c ? "outline-primary" : "outline-transparent"}`, style: { backgroundColor: c }, onClick: () => setColor(c) }, c + i)))
                                        : ["red", "black", "blue", "yellow"].map((c) => (_jsx("div", { className: `w-5 h-5 mt-3 p-1 cursor-pointer rounded-full border-8 border-transparent outline ${color === c ? "outline-primary" : "outline-transparent"}`, style: { backgroundColor: c }, onClick: () => setColor(c) }, c))) })] }), _jsxs(Button, { className: "flex w-full bg-signature-gradient uppercase text-surface py-4 rounded-3xl font-medium !mt-6 mb-3 hover:glow-primary !duration-500 !transition-all", onClick: handelAddToCart, disabled: isPending, children: [_jsx(ShoppingBag, {}), "Add To Cart"] }), _jsx(Button, { className: "flex w-full glass uppercase text-primary py-4 rounded-3xl font-medium ghost-border !border-[2px]", children: "Add To Wishlist" })] })] }) }));
};
export default ProductDetails;
