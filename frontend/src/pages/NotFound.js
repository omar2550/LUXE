import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Use 'next/link' if using Next.js
const NotFound = () => {
    // Framer Motion Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.3 },
        },
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
        },
    };
    // 💎 Floating 'Jewel' Elements (Abstract LUXE items)
    const FloatingJewel = ({ className, delay }) => (_jsx(motion.div, { initial: { opacity: 0, scale: 0.5 }, animate: {
            opacity: 1,
            scale: 1,
            y: ["0%", "15%", "0%"],
            rotate: [0, 10, -10, 0],
        }, transition: {
            delay: delay,
            duration: 1,
            ease: "easeOut",
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 10, repeat: Infinity, ease: "easeInOut" },
        }, className: `absolute ${className}`, children: _jsx("div", { className: "w-full h-full ghost-border glass rounded-xl glow-primary", style: { transform: "rotate(45deg)" } }) }));
    return (_jsxs("div", { className: "min-h-screen bg-surface flex items-center justify-center overflow-hidden relative cursor-default", children: [_jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-surface-container-low rounded-full blur-[150px] pointer-events-none" }), _jsx(FloatingJewel, { className: "z-10 w-20 h-20 -top-10 -left-10 opacity-70", delay: 0.1 }), _jsx(FloatingJewel, { className: "z-10 w-10 h-10 top-1/4 left-[10%] opacity-40", delay: 0.3 }), _jsx(FloatingJewel, { className: "z-10 w-24 h-24 -bottom-12 -right-12", delay: 0.2 }), _jsx(FloatingJewel, { className: "z-10 w-12 h-12 bottom-[20%] right-[15%] opacity-50", delay: 0.4 }), _jsxs(motion.main, { variants: containerVariants, initial: "hidden", animate: "visible", className: "relative z-20 flex flex-col items-center px-4 max-w-4xl", children: [_jsx(motion.div, { variants: itemVariants, className: "relative mb-4 xs:mb-20", children: _jsx(motion.h1, { className: "font-display text-[8rem] xs:text-[12rem] leading-none tracking-tightest bg-signature-gradient text-transparent bg-clip-text drop-shadow-ambient select-none", children: "404" }) }), _jsxs(motion.div, { variants: itemVariants, className: "glass ghost-border rounded-xl p-6 md:p-12 w-full max-w-xl text-center backdrop-blur-glass flex flex-col items-center", children: [_jsx(motion.p, { variants: itemVariants, className: "font-body text-xs md:text-body-sm text-tertiary uppercase tracking-widest mb-3", children: "Exception_Error. Not_Found" }), _jsx(motion.h2, { variants: itemVariants, className: "font-display text-3xl md:text-display-lg text-on-surface mb-6", children: "Lost in the Luxe." }), _jsx(motion.p, { variants: itemVariants, className: "font-body text-on-surface-variant max-w-sm mb-12", children: "The exclusive piece or curation you are seeking has slipped into the ether. Let us guide you back to civilization." }), _jsx(motion.div, { variants: itemVariants, children: _jsxs(Link, { to: "/", className: "group relative inline-flex items-center justify-center px-10 py-4 font-body font-bold text-surface bg-on-surface rounded-full hover-scale glow-primary transition-all duration-300 overflow-hidden", children: [_jsx("span", { className: "absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)]", children: _jsx("span", { className: "relative h-full w-10 bg-surface/20 transition-all duration-500 group-hover:left-[100%] left-[-100%]" }) }), _jsxs("span", { className: "relative z-10 flex items-center gap-3", children: [_jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 rotate-180" // Flipped for LTR
                                                    , fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M10 19l-7-7m0 0l7-7m-7 7h18" }) }), "BACK TO CURATION"] })] }) })] })] })] }));
};
export default NotFound;
