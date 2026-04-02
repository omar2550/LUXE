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
    try {
      const { data } = await api.post("/product", product);
      return data;
    } catch (error) {
      throw error;
    }
  },
  getProducts: async () => {
    try {
      const { data }: { data: productType[] } = await api.get("/product");
      return data;
    } catch (error) {
      throw error;
    }
  },
  getProduct: async (id: string) => {
    try {
      const { data }: { data: productType[] } = await api.get(`/product/${id}`);
      return data;
    } catch (error) {
      throw error;
    }
  },
  getProductByCat: async (cat: string) => {
    try {
      const { data }: { data: productType[] } = await api.get(
        `/product/${cat}`,
      );
      console.log(data);
      return data;
    } catch (error) {
      throw error;
    }
  },
  deleteProduct: async (id: string) => {
    try {
      await api.delete(`/product/${id}`);
    } catch (error) {
      throw error;
    }
  },
};

export default productService;
