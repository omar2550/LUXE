import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
const DialogContext = React.createContext(null);
function useDialog() {
    const context = React.useContext(DialogContext);
    if (!context)
        throw new Error("Dialog components must be used within <Dialog />");
    return context;
}
// 1. Root Component
export function Dialog({ children, open: controlledOpen, onOpenChange, }) {
    const [internalOpen, setInternalOpen] = React.useState(false);
    const open = controlledOpen ?? internalOpen;
    const setOpen = onOpenChange ?? setInternalOpen;
    React.useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        }
        else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [open]);
    React.useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape")
                setOpen(false);
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [setOpen]);
    return (_jsx(DialogContext.Provider, { value: { open, setOpen }, children: children }));
}
// 2. Trigger
export function DialogTrigger({ children }) {
    const { setOpen } = useDialog();
    const child = children;
    return React.cloneElement(child, {
        onClick: (e) => {
            child.props.onClick?.(e);
            setOpen(true);
        },
    });
}
// 5. Close Button
export function DialogClose({ children }) {
    const { setOpen } = useDialog();
    const child = children;
    return React.cloneElement(child, {
        onClick: (e) => {
            child.props.onClick?.(e);
            setOpen(false);
        },
    });
}
// 3. Content & Overlay (The Core)
export function DialogContent({ children, className, showCloseButton = true, }) {
    const { open, setOpen } = useDialog();
    return createPortal(_jsx(AnimatePresence, { children: open && (_jsxs("div", { className: "fixed inset-0 z-[100] flex items-center justify-center p-4", children: [_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, onClick: () => setOpen(false), className: "absolute inset-0 bg-surface/60 backdrop-blur-glass" }), _jsxs(motion.div, { initial: { opacity: 0, scale: 0.95, y: 20 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.95, y: 15 }, transition: { type: "spring", damping: 25, stiffness: 350 }, className: cn("relative w-full max-w-lg overflow-auto max-h-[90vh] no-scrollbar", "glass ghost-border rounded-xl shadow-ambient", "bg-surface-container-low text-on-surface p-6 outline-none", className), children: [showCloseButton && (_jsx("button", { onClick: () => setOpen(false), className: "absolute top-4 right-4 p-2 rounded-full text-on-surface-variant hover:text-primary hover:bg-white/5 transition-all active:scale-90", children: _jsx(XIcon, { size: 18 }) })), children] })] })) }), document.body);
}
// 4. Formatting Components
export const DialogHeader = ({ className, ...props }) => (_jsx("div", { className: cn("flex flex-col gap-2 mb-6 text-left", className), ...props }));
export const DialogTitle = ({ className, ...props }) => (_jsx("h2", { className: cn("font-display text-display-lg !text-2xl font-semibold tracking-tightest", className), ...props }));
export const DialogDescription = ({ className, ...props }) => (_jsx("p", { className: cn("font-body text-sm text-on-surface-variant leading-relaxed", className), ...props }));
export const DialogFooter = ({ className, ...props }) => (_jsx("div", { className: cn("mt-8 -mx-6 -mb-6 p-4 flex flex-col-reverse sm:flex-row sm:justify-end gap-3", "bg-surface-container-lowest/50 border-t border-outline-variant", className), ...props }));
