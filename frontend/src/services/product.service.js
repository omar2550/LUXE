import api from "@/lib/axios";
const productService = {
    createProduct: async (product) => {
        const { data } = await api.post("/product", product);
        return data;
    },
    getProducts: async () => {
        const { data } = await api.get("/product");
        return data;
    },
    getFeaturedProducts: async () => {
        const { data } = await api.get(`/product/featured`);
        return data;
    },
    getProduct: async (id) => {
        const { data } = await api.get(`/product/${id}`);
        return data;
    },
    getProductsByCat: async (cat) => {
        const { data } = await api.get(`/product/category/${cat}`);
        return data;
    },
    updateProduct: async ({ id, data }) => {
        await api.patch(`/product/${id}`, data);
    },
    deleteProduct: async (id) => {
        await api.delete(`/product/${id}`);
    },
};
export default productService;
