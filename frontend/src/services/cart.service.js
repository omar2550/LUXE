import api from "@/lib/axios";
export const cartService = {
    getCart: async () => {
        const { data } = await api.get("/cart");
        return data;
    },
    addToCart: async (id) => {
        await api.post("/cart", { productId: id });
    },
    updateQuantityCart: async ({ id, quantity, }) => {
        await api.put(`/cart/${id}`, { quantity });
    },
    removeFromCart: async (id) => {
        await api.delete(`/cart/${id}`);
    },
    removeAllCarts: async () => {
        await api.delete("/cart");
    },
};
