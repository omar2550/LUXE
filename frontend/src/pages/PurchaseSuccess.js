import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { usePaymentSuccess } from "@/hooks/usePayment";
const PurchaseSuccess = () => {
    const containerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                when: "beforeChildren",
                staggerChildren: 0.15,
            },
        },
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0 },
    };
    const { mutate } = usePaymentSuccess();
    const [searchParams] = useSearchParams();
    const hasCalled = useRef(false);
    useEffect(() => {
        const sessionId = searchParams.get("session_id");
        if (sessionId && !hasCalled.current) {
            hasCalled.current = true;
            mutate(sessionId);
        }
    }, [searchParams, mutate]);
    return (_jsxs("div", { className: "bg-surface flex items-center justify-center xs:p-6 p-4 relative overflow-hidden", children: [_jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-primary/20 blur-[100px] rounded-full pointer-events-none" }), _jsxs(motion.div, { variants: containerVariants, initial: "hidden", animate: "visible", className: "glass ghost-border p-8 max-w-md w-full rounded-xl text-center relative z-10 glow-primary", children: [_jsx(motion.div, { variants: itemVariants, className: "w-24 h-24 mx-auto bg-signature-gradient rounded-full flex items-center justify-center mb-6 shadow-ambient", children: _jsx("svg", { className: "w-12 h-12 text-surface-container-lowest", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 3, children: _jsx(motion.path, { initial: { pathLength: 0 }, animate: { pathLength: 1 }, transition: { delay: 0.5, duration: 0.6, ease: "easeOut" }, strokeLinecap: "round", strokeLinejoin: "round", d: "M5 13l4 4L19 7" }) }) }), _jsx(motion.h1, { variants: itemVariants, className: "text-3xl font-display text-on-surface tracking-tightest mb-4", children: "Order Confirmed!" }), _jsx(motion.p, { variants: itemVariants, className: "text-body-sm font-body text-on-surface-variant mb-6", children: "Thank you for your purchase. Your luxury items is being prepared with care and will be shipped shortly." }), _jsxs(motion.div, { variants: itemVariants, className: "bg-surface/50 rounded-md p-2 mb-4", children: [_jsxs("div", { className: "flex flex-col xs:flex-row gap-2 items-center justify-between", children: [_jsx("p", { className: "text-body-sm text-on-surface/50", children: "Order Number" }), _jsx("span", { className: "text-tertiary ", children: "#123asd" })] }), _jsxs("div", { className: "flex flex-col xs:flex-row gap-2 items-center justify-between", children: [_jsx("p", { className: "text-body-sm text-on-surface/50", children: "Estimated Delivery" }), _jsx("span", { className: "text-tertiary ", children: "3-5 Business Days" })] })] }), _jsx(motion.div, { variants: itemVariants, className: "flex flex-col gap-4", children: _jsx(Link, { to: "/", className: "w-full py-2 rounded-lg glass ghost-border-focus text-on-surface font-body font-medium hover:text-primary transition-colors hover-scale", children: "Continue Shopping" }) })] })] }));
};
export default PurchaseSuccess;
