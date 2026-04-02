import productService from "@/services/product.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useCreateProduct = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: productService.createProduct,
    onMutate: () => {
      toast.loading("Creating New Product...", { id: "createProduct" });
    },
    onSuccess: () => {
      toast.success("Product Created Successfully", { id: "createProduct" });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Created Product failed", {
        id: "createProduct",
      });
    },
  });
};

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: productService.getProducts,
  });
};

export const useDeleteProduct = () => {
  return useMutation({
    mutationFn: productService.deleteProduct,
    onMutate: () => {
      toast.loading("Deleting Product...", { id: "deleteProduct" });
    },
    onSuccess: () => {
      toast.success("Product Deleted Successfully", { id: "deleteProduct" });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Delete Product failed", {
        id: "deleteProduct",
      });
    },
  });
};
