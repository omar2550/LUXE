import api from "@/lib/axios";
import { productType } from "./product.service";

export interface CartItemsType {
  product: productType;
  quantity: number;
}

export const cartService = {
  getCart: async () => {
    const { data }: { data: CartItemsType[] } = await api.get("/cart");
    return data;
  },

  addToCart: async (id: string) => {
    await api.post("/cart", { productId: id });
  },

  updateQuantityCart: async ({
    id,
    quantity,
  }: {
    id: string;
    quantity: number;
  }) => {
    await api.put(`/cart/${id}`, { quantity });
  },

  removeFromCart: async (id: string) => {
    await api.delete(`/cart/${id}`);
  },
};
