import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useCarts, useRemoveFromCart, useUpdateQuantityCart, } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { usePayment } from "@/hooks/usePayment";
import AppAlertDialog from "@/components/AppAlertDialog";
import { useValidateCoupon } from "@/hooks/useCoupon";
import { Input } from "@/components/ui/input";
export default function Cart() {
    const { data, isPending: isDataLoading } = useCarts();
    const [cartItems, setCartItems] = useState(data || []);
    // Update cartItems State After data comes
    useEffect(() => {
        if (data) {
            setCartItems(data);
        }
    }, [data]);
    // Calculate Total Payments
    const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const shipping = subtotal > 0 ? 10 : 0;
    const total = subtotal + shipping;
    // Handel Update Quantity
    const { mutate: updateQuantityCart } = useUpdateQuantityCart();
    const updateQuantity = (id, quantity) => {
        setCartItems((prev) => prev.map((item) => {
            if (item.product._id === id) {
                const newQuantity = Math.max(1, item.quantity + quantity);
                updateQuantityCart({ id: item.product._id, quantity: newQuantity });
                return { ...item, quantity: newQuantity };
            }
            return item;
        }));
    };
    // Handel Remove Item
    const { mutate, isPending: isRemovingLoading } = useRemoveFromCart();
    const [openDelete, setOpenDelete] = useState(false);
    const [id, setId] = useState("");
    const removeItem = () => {
        setOpenDelete(false);
        mutate(id);
        setCartItems((prev) => prev.filter((item) => item.product._id !== id));
    };
    // Handel Go To Payment Stripe Page
    const { mutate: paymentMutate } = usePayment();
    const { mutateAsync: couponValidationMutate } = useValidateCoupon();
    const [couponCode, setCouponCode] = useState(null);
    const [couponInfo, setCouponInfo] = useState(null);
    const goToStripePaymentPage = async () => {
        if (couponInfo) {
            paymentMutate({
                products: data,
                couponCode: couponInfo.code,
            });
        }
        else {
            paymentMutate({
                products: data,
            });
        }
    };
    const applyCoupon = async () => {
        if (couponCode) {
            try {
                const couponInfo = await couponValidationMutate(couponCode);
                if (couponInfo) {
                    setCouponInfo(couponInfo.data);
                }
            }
            catch (error) {
                console.log(error);
                setCouponInfo(null);
            }
        }
    };
    return (_jsx("div", { className: "min-h-screen bg-surface py-12 px-4 selection:bg-primary/30", children: _jsxs("div", { children: [_jsxs(motion.div, { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, className: "flex items-center gap-4 mb-12", children: [_jsx("div", { className: "p-3 bg-surface-container-highest rounded-full ghost-border glow-primary", children: _jsx(ShoppingBag, { className: "w-6 h-6 text-primary" }) }), _jsxs("h1", { className: "xs:text-display-lg text-5xl font-display text-on-surface tracking-tightest", children: ["Your", " ", _jsx("span", { className: "text-transparent bg-clip-text bg-signature-gradient", children: "Cart" })] })] }), _jsx(AppAlertDialog, { open: openDelete, onOpenChange: setOpenDelete, handelDeleteProduct: removeItem }), _jsxs("div", { className: "flex flex-col lg:flex-row gap-8", children: [_jsx("div", { className: "flex-1 space-y-4", children: _jsx(AnimatePresence, { mode: "popLayout", children: cartItems.length > 0 ? (cartItems.map((item) => (_jsxs(motion.div, { layout: true, initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.9, x: -20 }, transition: {
                                        duration: 0.3,
                                        type: "spring",
                                        stiffness: 200,
                                        damping: 20,
                                    }, className: "glass ghost-border rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center gap-2 group hover-scale", children: [_jsx("div", { className: "w-full h-24 sm:w-32 sm:h-32 rounded-lg overflow-hidden flex-shrink-0 ghost-border", children: _jsx(Link, { to: `/product/${item.product._id}`, children: _jsx("img", { src: item.product.images[0], alt: item.product.name, className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" }) }) }), _jsx(Link, { to: `/product/${item.product._id}`, children: _jsxs("div", { className: "flex-1 flex flex-col gap-1", children: [_jsx("p", { className: "text-body-sm text-primary font-medium tracking-widest uppercase", children: item.product.category }), _jsx("h3", { className: "text-xl font-display font-semibold text-on-surface", children: item.product.name }), _jsxs("p", { className: "text-lg text-on-surface-variant mt-2", children: ["$", item.product.price.toLocaleString()] })] }) }), _jsxs("div", { className: "flex ml-auto items-center gap-2 w-full sm:w-auto justify-between sm:justify-end mt-4 sm:mt-0", children: [_jsxs("div", { className: "flex items-center gap-3 bg-surface-container-low rounded-full px-3 py-1 ghost-border", children: [_jsx(Button, { onClick: () => updateQuantity(item.product._id, -1), className: "text-on-surface-variant hover:text-primary transition-colors disabled:opacity-50", disabled: item.quantity <= 1 || isRemovingLoading, children: _jsx(Minus, { className: "w-4 h-4" }) }), _jsx("span", { className: "w-6 text-center font-medium", children: item.quantity }), _jsx(Button, { disabled: isRemovingLoading, onClick: () => updateQuantity(item.product._id, 1), className: "text-on-surface-variant hover:text-primary transition-colors", children: _jsx(Plus, { className: "w-4 h-4" }) })] }), _jsx(Button, { onClick: () => {
                                                        setOpenDelete(true);
                                                        setId(item.product._id);
                                                    }, className: "text-on-surface-variant hover:text-secondary transition-colors", "aria-label": "Remove item", disabled: isRemovingLoading, children: _jsx(Trash2, { className: "w-5 h-5" }) })] })] }, item.product._id)))) : (_jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "glass ghost-border rounded-xl p-12 text-center", children: [_jsx(ShoppingBag, { className: "w-16 h-16 text-on-surface-variant mx-auto mb-4 opacity-50" }), _jsx("h3", { className: "text-2xl font-display text-on-surface mb-2", children: "Your cart is empty" }), _jsx("p", { className: "text-on-surface-variant", children: "Discover our exclusive collections and add some luxury to your life." })] })) }) }), _jsx("div", { className: "w-full lg:w-[350px]", children: _jsxs(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.2 }, className: "glass ghost-border rounded-xl p-4 xs:p-6 sm:p-8 sticky top-6", children: [_jsx("h2", { className: "text-2xl font-display font-semibold mb-6", children: "Order Summary" }), _jsxs("div", { className: "space-y-4 text-on-surface-variant font-body", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { children: "Subtotal" }), _jsxs("span", { className: "text-on-surface", children: ["$", subtotal.toLocaleString()] })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { children: "Shipping Estimation" }), _jsxs("span", { className: "text-on-surface", children: ["$", shipping.toLocaleString()] })] }), couponInfo && (_jsxs("div", { className: "flex justify-between items-center text-tertiary", children: [_jsx("span", { children: "Discount Percentage" }), _jsxs("span", { children: [couponInfo.discountPercentage, "%"] })] })), _jsxs("div", { className: `pt-4 border-t border-outline-variant flex justify-between items-center
                  ${couponInfo ? "line-through opacity-40" : ""}
                  `, children: [_jsx("span", { className: "text-lg text-on-surface", children: "Total" }), _jsxs("span", { className: "text-2xl font-display font-bold text-transparent bg-clip-text bg-signature-gradient", children: ["$", total.toLocaleString()] })] }), couponInfo && (_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-lg text-on-surface", children: "Total" }), _jsxs("span", { className: "text-2xl font-display font-bold text-transparent bg-clip-text bg-signature-gradient", children: ["$", (total -
                                                                (total * couponInfo.discountPercentage) / 100).toLocaleString()] })] }))] }), _jsxs(Button, { disabled: cartItems.length === 0 || isDataLoading, className: "w-full mt-8 bg-signature-gradient text-surface font-bold text-sm xs:text-lg py-4 rounded-full flex items-center justify-center gap-2 hover-scale glow-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 overflow-hidden", onClick: goToStripePaymentPage, children: ["Proceed to Checkout", _jsx(ArrowRight, { className: "w-5 h-5" })] }), _jsx("label", { htmlFor: "couponCode", children: _jsx(Input, { id: "couponCode", placeholder: "Enter Coupon Code Here...", className: "w-full my-4 p-5", value: couponCode ? couponCode : "", onChange: (e) => setCouponCode(e.target.value) }) }), _jsx(Button, { disabled: cartItems.length === 0 || isDataLoading, className: "w-full font-bold text-sm xs:text-[16px] rounded-full flex items-center justify-center gap-2", onClick: applyCoupon, variant: "outline", children: "Apply Coupon" }), _jsxs("p", { className: "text-center mt-4 text-body-sm text-on-surface-variant flex items-center justify-center gap-2", children: [_jsx("span", { className: "w-2 h-2 rounded-full bg-tertiary shadow-[0_0_8px_#81ecff]" }), "Secure and encrypted checkout"] })] }) })] })] }) }));
}
