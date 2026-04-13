import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Link, useLocation } from "react-router-dom";
import { Menu, Search, ShoppingCart, User2 } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InputGroup, InputGroupAddon, InputGroupInput, } from "../ui/input-group";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger, } from "../ui/navigation-menu";
const Header = ({ user }) => {
    const location = useLocation();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const searchRef = useRef(null);
    useEffect(() => {
        const handelClickOutSide = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target))
                setIsSearchOpen(false);
        };
        document.addEventListener("pointerdown", handelClickOutSide);
        return () => document.removeEventListener("pointerdown", handelClickOutSide);
    }, [isSearchOpen]);
    return (_jsxs("header", { className: "bg-surface ghost-border !border-t-0 !border-x-0 sticky top-0 left-0 py-2 px-4 z-50 w-full", children: [_jsxs("nav", { className: "hidden sm:flex mx-auto items-center justify-between", children: [_jsxs(Link, { to: "/", children: [" ", _jsx("h1", { className: "text-xl font-bold", children: "LUXE" })] }), _jsxs("div", { className: "flex items-center gap-3 text-on-surface-variant uppercase font-semibold text-body-sm", children: [_jsx(Link, { to: "/products", className: location.pathname === "/products"
                                    ? "text-primary underline-offset-4 underline"
                                    : "", children: "Products" }), _jsx(Link, { to: "/categories", className: location.pathname === "/categories"
                                    ? "text-primary underline-offset-4 underline"
                                    : "", children: "Categories" }), user?.role === "admin" && (_jsx(Link, { to: "/dashboard", className: location.pathname === "/dashboard"
                                    ? "text-primary underline-offset-4 underline"
                                    : "", children: "Dashboard" }))] }), _jsxs("div", { className: "flex items-center gap-4 text-on-surface-variant", children: [_jsxs(AnimatePresence, { mode: "popLayout", children: [!isSearchOpen && (_jsx(motion.div, { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.8 }, transition: { duration: 0.15 }, onClick: () => setIsSearchOpen(true), className: "cursor-pointer duration-300 transition-all hover:text-primary", children: _jsx(Search, { size: 16 }) }, "search-icon")), isSearchOpen && (_jsx(motion.div, { initial: { width: 0, opacity: 0 }, animate: { width: 250, opacity: 1 }, exit: { width: 0, opacity: 0 }, transition: { type: "spring", stiffness: 300, damping: 30 }, ref: searchRef, children: _jsxs(InputGroup, { className: "ghost-border", children: [_jsx(InputGroupInput, { autoFocus: true, placeholder: "Search..." }), _jsx(InputGroupAddon, { className: "w-7 h-7", children: _jsx(Search, { size: 14 }) })] }) }, "search-input"))] }), user ? (_jsxs(_Fragment, { children: [_jsx(Link, { to: "/cart", className: "duration-300 transition-all hover:text-primary", children: _jsx(ShoppingCart, { size: 16 }) }), _jsx(Link, { to: "/profile", className: "duration-300 transition-all hover:text-primary", children: _jsx(User2, { size: 16 }) })] })) : (_jsx(Link, { to: "/auth/login", children: _jsx(Button, { size: "sm", className: "bg-signature-gradient text-on-surface font-semibold", children: "Log In" }) }))] })] }), _jsxs("nav", { className: "sm:hidden mx-auto flex items-center justify-between", children: [_jsx(Link, { to: "/", children: _jsx("h1", { className: "text-xl font-bold", children: "LUXE" }) }), _jsx(NavigationMenu, { children: _jsx(NavigationMenuList, { children: _jsxs(NavigationMenuItem, { children: [_jsx(NavigationMenuTrigger, { children: _jsx(Menu, {}) }), _jsx(NavigationMenuContent, { children: _jsxs("ul", { className: "min-w-36 xs:min-w-60", children: [_jsx(ListItem, { href: "/products", title: "Products" }), _jsx(ListItem, { href: "/categories", title: "Categories" }), user?.role === "admin" && (_jsx(ListItem, { href: "/dashboard", title: "Dashboard" })), _jsx("li", { children: _jsxs(AnimatePresence, { mode: "popLayout", children: [!isSearchOpen && (_jsx(motion.div, { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.8 }, transition: { duration: 0.15 }, onClick: () => setIsSearchOpen(true), 
                                                                // className="cursor-pointer p-2 duration-300 transition-all hover:text-primary"
                                                                className: "flex items-center gap-2 rounded-lg p-2 text-sm transition-all outline-none hover:bg-muted focus:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-1 in-data-[slot=navigation-menu-content]:rounded-md data-active:bg-muted/50 data-active:hover:bg-muted data-active:focus:bg-muted [&_svg:not([class*='size-'])]:size-4", children: _jsx(Search, { size: 14 }) }, "search-icon")), isSearchOpen && (_jsx(motion.div, { initial: { width: 0, opacity: 0 }, animate: { width: 230, opacity: 1 }, exit: { width: 0, opacity: 0 }, transition: {
                                                                    type: "spring",
                                                                    stiffness: 300,
                                                                    damping: 30,
                                                                }, ref: searchRef, children: _jsxs(InputGroup, { className: "ghost-border bg-surface-variant", children: [_jsx(InputGroupInput, { autoFocus: true, placeholder: "Search...", className: "" }), _jsx(InputGroupAddon, { className: "w-5 h-5", children: _jsx(Search, {}) })] }) }, "search-input"))] }) }), user && (_jsx(ListItem, { href: "/cart", title: "", children: _jsx(ShoppingCart, { size: 16 }) })), user && (_jsx(ListItem, { href: "/cart", title: "", children: _jsx(User2, { size: 16 }) })), !user && (_jsx(ListItem, { href: "/auth/login", title: "", children: _jsx(Button, { size: "sm", className: "bg-signature-gradient text-on-surface font-semibold", children: "Log In" }) }))] }) })] }) }) })] })] }));
};
function ListItem({ title, children, href, ...props }) {
    return (_jsx("li", { ...props, children: _jsx(Link, { to: href, className: location.pathname === href
                ? "text-primary underline-offset-4 underline"
                : "", children: _jsx("div", { className: "flex items-center gap-2 rounded-lg p-2 text-sm transition-all outline-none hover:bg-muted focus:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-1 in-data-[slot=navigation-menu-content]:rounded-md data-active:bg-muted/50 data-active:hover:bg-muted data-active:focus:bg-muted [&_svg:not([class*='size-'])]:size-4", children: _jsxs("div", { className: "flex flex-col gap-1 text-sm", children: [_jsx("div", { className: "leading-none font-medium", children: title }), _jsx("div", { className: "line-clamp-2 text-muted-foreground", children: children })] }) }) }) }));
}
export default Header;
