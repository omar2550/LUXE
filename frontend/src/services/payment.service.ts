import api from "@/lib/axios";
import { CartItemsType, cartService } from "./cart.service";

export const paymentService = {
  handelPayment: async ({
    products,
    couponCode,
  }: {
    products: CartItemsType[];
    couponCode?: string;
  }) => {
    const res = await api.post("/payments/create-checkout-session", {
      products: products,
      couponCode: couponCode ? couponCode : null,
    });

    const { url } = res.data;

    if (url) {
      window.location.assign(url);
    } else {
      throw new Error("Failed to get checkout URL from server.");
    }
  },

  paymentSuccess: async (sessionId: string) => {
    await api.post("/payments/checkout-success", { sessionId });
    cartService.removeAllCarts();
  },
};
