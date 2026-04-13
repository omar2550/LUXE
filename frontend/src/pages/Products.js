import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ProductCard from "@/components/ProductCard";
import { PagePagination } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { useSearchParams } from "react-router-dom";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { useProductsByCat } from "@/hooks/useProduct";
import { useState } from "react";
const Products = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [cat, setCat] = useState("Clothing");
    const { data: productsData, isLoading: isProductLoading } = useProductsByCat(cat);
    const limit = 6;
    const currentPage = Number(searchParams.get("page")) || 1;
    const totalPages = Math.ceil(productsData?.length / limit || 1);
    const startIndex = (currentPage - 1) * limit;
    const endIndex = startIndex + limit;
    return (_jsxs("section", { className: "bg-surface px-4 py-16", children: [_jsxs("header", { children: [_jsx("h1", { className: "text-4xl xs:text-display-lg bg-signature-gradient bg-clip-text text-transparent font-bold", children: "The Curated Edit" }), _jsx("p", { className: "text-sm text-on-surface-variant/60 sm:w-1/2 mt-3", children: "Discover our signature collection of artisanal pieces, where architectural precision meets ethereal luxury. Each item is a testament to timeless craftsmanship." })] }), _jsxs("div", { className: "grid sm:grid-cols-4 gap-4 mt-16", children: [_jsxs("div", { className: "sm:col-span-1", children: [_jsxs("div", { children: [_jsx("p", { className: "text-body-sm uppercase text-on-surface-variant", children: "Price range" }), _jsx(Slider, { defaultValue: [50, 5000], max: 10000, step: 10, className: "mt-5" }), _jsxs("div", { className: "flex items-center justify-between uppercase text-on-surface/50 text-body-sm mt-2 pr-5", children: [_jsx("span", { children: "$5" }), _jsx("span", { children: "+$10,000" })] })] }), _jsxs("div", { className: "mt-5", children: [_jsx("p", { className: "text-body-sm uppercase text-on-surface-variant", children: "Palette" }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-5 h-5 mt-3 cursor-pointer rounded-full border border-transparent outline outline-primary bg-black" }), _jsx("div", { className: "w-5 h-5 mt-3 cursor-pointer rounded-full border border-transparent outline outline-transparent bg-white" }), _jsx("div", { className: "w-5 h-5 mt-3 cursor-pointer rounded-full border border-transparent outline outline-transparent bg-blue-700" }), _jsx("div", { className: "w-5 h-5 mt-3 cursor-pointer rounded-full border border-transparent outline outline-transparent bg-yellow-500" })] })] }), _jsxs("div", { className: "mt-5", children: [_jsx("p", { className: "text-body-sm uppercase text-on-surface-variant", children: "Category" }), _jsx("div", { className: "mt-3 pr-5 cursor-pointer", children: _jsx("span", { className: `text-body-sm ${cat === "Clothing" ? "text-on-surface" : "text-on-surface/50"}`, onClick: () => {
                                                setCat("Clothing");
                                                setSearchParams({ page: "1" });
                                            }, children: "Clothing" }) }), _jsx("div", { className: "mt-2 pr-5 cursor-pointer", children: _jsx("span", { className: `text-body-sm ${cat === "Electronics" ? "text-on-surface" : "text-on-surface/50"}`, onClick: () => {
                                                setCat("Electronics");
                                                setSearchParams({ page: "1" });
                                            }, children: "Electronics" }) }), _jsx("div", { className: "mt-2 pr-5 cursor-pointer", children: _jsx("span", { className: `text-body-sm ${cat === "Home Decor" ? "text-on-surface" : "text-on-surface/50"}`, onClick: () => {
                                                setCat("Home Decor");
                                                setSearchParams({ page: "1" });
                                            }, children: "Home Decor" }) }), _jsx("div", { className: "mt-2 pr-5 cursor-pointer", children: _jsx("span", { className: `text-body-sm ${cat === "Furniture" ? "text-on-surface" : "text-on-surface/50"}`, onClick: () => {
                                                setCat("Furniture");
                                                setSearchParams({ page: "1" });
                                            }, children: "Furniture" }) })] })] }), _jsxs("div", { className: "sm:col-span-3", children: [_jsxs("div", { className: "xs:flex items-center justify-between -mt-1.5 mb-5", children: [_jsxs("p", { className: `text-body-sm text-on-surface/50`, children: ["Showing ", "58", " Pieces"] }), _jsxs("div", { className: "flex items-center gap-1 xs:-mt-2", children: [_jsxs("span", { className: `text-body-sm text-on-surface/50`, children: ["SORT", _jsx("span", { className: "text-[16px] font-bold", children: ":" })] }), _jsxs(Select, { children: [_jsx(SelectTrigger, { className: "w-full", children: _jsx(SelectValue, { placeholder: "Sort by..." }) }), _jsx(SelectContent, { children: _jsxs(SelectGroup, { children: [_jsx(SelectLabel, { children: "Sort by..." }), _jsx(SelectItem, { value: "Newest Arrivals", children: "Newest Arrivals" }), _jsx(SelectItem, { value: "banana", children: "Banana" }), _jsx(SelectItem, { value: "blueberry", children: "Blueberry" }), _jsx(SelectItem, { value: "grapes", children: "Grapes" }), _jsx(SelectItem, { value: "pineapple", children: "Pineapple" })] }) })] })] })] }), _jsx("div", { className: "grid xs:grid-cols-2 md:grid-cols-3 gap-4", children: isProductLoading
                                    ? Array.from({ length: 6 }).map((_, i) => (_jsxs("div", { className: "w-full", children: [_jsx(Skeleton, { className: "aspect-[3/4] w-full" }), _jsxs("div", { className: "mt-4 flex flex-col gap-1 px-2", children: [_jsx(Skeleton, { className: "h-4 w-2/3" }), _jsx(Skeleton, { className: "h-4 w-1/2" })] })] }, i + i + "sk")))
                                    : productsData
                                        .slice(startIndex, endIndex)
                                        .map((p, i) => _jsx(ProductCard, { product: p }, i)) }), _jsx("div", { className: "mt-6", children: _jsx(PagePagination, { currentPage: currentPage, totalPages: totalPages, setSearchParams: setSearchParams }) })] })] })] }));
};
export default Products;
