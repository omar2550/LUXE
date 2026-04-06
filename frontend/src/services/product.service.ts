import api from "@/lib/axios";

export type productType = {
  _id?: string;
  name: string;
  description: string;
  images: string[];
  price: number;
  stock: number;
  category: string;
  isFeatured: boolean;
};

const productService = {
  createProduct: async (product: productType) => {
    const { data } = await api.post("/product", product);
    return data;
  },
  getProducts: async () => {
    const { data }: { data: productType[] } = await api.get("/product");
    return data;
  },
  getFeaturedProducts: async () => {
    const { data }: { data: productType[] } =
      await api.get(`/product/featured`);
    return data;
  },
  getProduct: async (id: string) => {
    const { data }: { data: productType } = await api.get(`/product/${id}`);
    return data;
  },
  getProductsByCat: async (cat: string) => {
    const { data }: { data: productType[] } = await api.get(
      `/product/category/${cat}`,
    );
    return data;
  },
  updateProduct: async ({ id, data }: { id: string; data: productType }) => {
    await api.patch(`/product/${id}`, data);
  },
  deleteProduct: async (id: string) => {
    await api.delete(`/product/${id}`);
  },
};

export default productService;
