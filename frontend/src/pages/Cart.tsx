import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

import { CartItemsType } from "@/services/cart.service";
import {
  useCarts,
  useRemoveFromCart,
  useUpdateQuantityCart,
} from "@/hooks/useCart";
import { Button } from "@/components/ui/button";

export default function Cart() {
  const { data } = useCarts();
  const [cartItems, setCartItems] = useState<CartItemsType[]>(data || []);

  // Update cartItems State After data comes
  useEffect(() => {
    if (data) {
      setCartItems(data);
    }
  }, [data]);

  // Calculate Total Payments
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );
  const shipping = subtotal > 0 ? 50 : 0;
  const total = subtotal + shipping;

  // Handel Update Quantity
  const { mutate: updateQuantityCart } = useUpdateQuantityCart();
  const updateQuantity = (id: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.product._id === id) {
          const newQuantity = Math.max(1, item.quantity + quantity);
          updateQuantityCart({ id: item.product._id, quantity: newQuantity });
          return { ...item, quantity: newQuantity };
        }
        return item;
      }),
    );
  };

  // Handel Remove Item
  const { mutate, isPending } = useRemoveFromCart();
  const removeItem = (id: string) => {
    mutate(id);
    setCartItems((prev) => prev.filter((item) => item.product._id !== id));
  };

  return (
    <div className="min-h-screen bg-surface py-12 px-4 selection:bg-primary/30">
      <div>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-12"
        >
          <div className="p-3 bg-surface-container-highest rounded-full ghost-border glow-primary">
            <ShoppingBag className="w-6 h-6 text-primary" />
          </div>
          <h1 className="xs:text-display-lg text-5xl font-display text-on-surface tracking-tightest">
            Your{" "}
            <span className="text-transparent bg-clip-text bg-signature-gradient">
              Cart
            </span>
          </h1>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items List */}
          <div className="flex-1 space-y-4">
            <AnimatePresence mode="popLayout">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, x: -20 }}
                    transition={{
                      duration: 0.3,
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                    }}
                    key={item.product._id}
                    className="glass ghost-border rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center gap-2 group hover-scale"
                  >
                    {/* Image */}
                    <div className="w-full h-24 sm:w-32 sm:h-32 rounded-lg overflow-hidden flex-shrink-0 ghost-border">
                      <Link to={`/products/${item.product._id}`}>
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </Link>
                    </div>

                    {/* Details */}
                    <Link to={`/products/${item.product._id}`}>
                      <div className="flex-1 flex flex-col gap-1">
                        <p className="text-body-sm text-primary font-medium tracking-widest uppercase">
                          {item.product.category}
                        </p>
                        <h3 className="text-xl font-display font-semibold text-on-surface">
                          {item.product.name}
                        </h3>
                        <p className="text-lg text-on-surface-variant mt-2">
                          ${item.product.price.toLocaleString()}
                        </p>
                      </div>
                    </Link>

                    {/* Actions */}
                    <div className="flex ml-auto items-center gap-2 w-full sm:w-auto justify-between sm:justify-end mt-4 sm:mt-0">
                      {/* Quantity Control */}
                      <div className="flex items-center gap-3 bg-surface-container-low rounded-full px-3 py-1 ghost-border">
                        <Button
                          onClick={() => updateQuantity(item.product._id, -1)}
                          className="text-on-surface-variant hover:text-primary transition-colors disabled:opacity-50"
                          disabled={item.quantity <= 1 || isPending}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-6 text-center font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          disabled={isPending}
                          onClick={() => updateQuantity(item.product._id, 1)}
                          className="text-on-surface-variant hover:text-primary transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Remove Button */}
                      <Button
                        onClick={() => removeItem(item.product._id)}
                        className="text-on-surface-variant hover:text-secondary transition-colors"
                        aria-label="Remove item"
                        disabled={isPending}
                      >
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass ghost-border rounded-xl p-12 text-center"
                >
                  <ShoppingBag className="w-16 h-16 text-on-surface-variant mx-auto mb-4 opacity-50" />
                  <h3 className="text-2xl font-display text-on-surface mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-on-surface-variant">
                    Discover our exclusive collections and add some luxury to
                    your life.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary Sidebar */}
          <div className="w-full lg:w-[350px]">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass ghost-border rounded-xl p-6 sm:p-8 sticky top-6"
            >
              <h2 className="text-2xl font-display font-semibold mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 text-on-surface-variant font-body">
                <div className="flex justify-between items-center">
                  <span>Subtotal</span>
                  <span className="text-on-surface">
                    ${subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Shipping Estimation</span>
                  <span className="text-on-surface">
                    ${shipping.toLocaleString()}
                  </span>
                </div>

                <div className="pt-4 border-t border-outline-variant flex justify-between items-center">
                  <span className="text-lg text-on-surface">Total</span>
                  <span className="text-2xl font-display font-bold text-transparent bg-clip-text bg-signature-gradient">
                    ${total.toLocaleString()}
                  </span>
                </div>
              </div>

              <Button
                disabled={cartItems.length === 0}
                className="w-full mt-8 bg-signature-gradient text-surface font-bold text-lg py-4 rounded-full flex items-center justify-center gap-2 hover-scale glow-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                Proceed to Checkout
                <ArrowRight className="w-5 h-5" />
              </Button>

              <p className="text-center text-body-sm text-on-surface-variant mt-4 flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-tertiary shadow-[0_0_8px_#81ecff]"></span>
                Secure and encrypted checkout
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
