import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon, } from "lucide-react";
import { Link } from "react-router-dom";
function Pagination({ className, ...props }) {
    return (_jsx("nav", { role: "navigation", "aria-label": "pagination", "data-slot": "pagination", className: cn("mx-auto flex w-full justify-center", className), ...props }));
}
function PaginationContent({ className, ...props }) {
    return (_jsx("ul", { "data-slot": "pagination-content", className: cn("flex items-center gap-0.5", className), ...props }));
}
function PaginationItem({ ...props }) {
    return _jsx("li", { "data-slot": "pagination-item", ...props });
}
function PaginationLink({ className, isActive, size = "icon", to, ...props }) {
    return (_jsx(Button, { variant: isActive ? "outline" : "ghost", size: size, className: cn(className), nativeButton: false, render: _jsx(Link, { "aria-current": isActive ? "page" : undefined, "data-slot": "pagination-link", "data-active": isActive, to: to, ...props }) }));
}
function PaginationPrevious({ className, text = "Previous", ...props }) {
    return (_jsxs(PaginationLink, { "aria-label": "Go to previous page", size: "default", className: cn("pl-1.5!", className), ...props, children: [_jsx(ChevronLeftIcon, { "data-icon": "inline-start" }), _jsx("span", { className: "hidden sm:block", children: text })] }));
}
function PaginationNext({ className, text = "Next", ...props }) {
    return (_jsxs(PaginationLink, { "aria-label": "Go to next page", size: "default", className: cn("pr-1.5!", className), ...props, children: [_jsx("span", { className: "hidden sm:block", children: text }), _jsx(ChevronRightIcon, { "data-icon": "inline-end" })] }));
}
function PaginationEllipsis({ className, ...props }) {
    return (_jsxs("span", { "aria-hidden": true, "data-slot": "pagination-ellipsis", className: cn("flex size-8 items-center justify-center [&_svg:not([class*='size-'])]:size-4", className), ...props, children: [_jsx(MoreHorizontalIcon, {}), _jsx("span", { className: "sr-only", children: "More pages" })] }));
}
const PagePagination = ({ currentPage, totalPages, setSearchParams, }) => {
    const handelPageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setSearchParams({ page: String(newPage) });
        }
    };
    const generatePagination = (currentPage, totalPages) => {
        if (totalPages <= 5) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }
        if (currentPage < 4) {
            return [1, 2, 3, 4, "...", totalPages];
        }
        if (currentPage >= totalPages - 2) {
            return [
                1,
                "...",
                totalPages - 3,
                totalPages - 2,
                totalPages - 1,
                totalPages,
            ];
        }
        return [
            1,
            "...",
            currentPage - 1,
            currentPage,
            currentPage + 1,
            "...",
            totalPages,
        ];
    };
    const paginationItems = generatePagination(currentPage, totalPages);
    return (_jsx(Pagination, { children: _jsxs(PaginationContent, { className: "flex-wrap", children: [_jsx(PaginationItem, { children: _jsx(PaginationPrevious, { className: currentPage <= 1
                            ? "text-on-surface-variant/40 pointer-events-none"
                            : "", to: `/products?page=${currentPage - 1}` }) }), paginationItems.map((item, i) => {
                    const itemKey = `page-${item}-${i}`;
                    if (item === "...") {
                        return (_jsx(PaginationItem, { children: _jsx(PaginationEllipsis, {}) }, itemKey));
                    }
                    return (_jsx(PaginationItem, { onClick: () => handelPageChange(Number(item)), children: _jsx(PaginationLink, { isActive: currentPage === item, to: `/products?page=${item}`, children: item }) }, itemKey));
                }), _jsx(PaginationItem, { children: _jsx(PaginationNext, { className: currentPage >= totalPages
                            ? "text-on-surface-variant/40 pointer-events-none"
                            : "", to: `/products?page=${currentPage + 1}` }) })] }) }));
};
export { PagePagination, Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, };
