import productService from "@/services/product.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
export const useCreateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: productService.createProduct,
        onMutate: () => {
            toast.loading("Creating New Product...", { id: "createProduct" });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            toast.success("Product Created Successfully", { id: "createProduct" });
        },
        onError: (error) => {
            toast.error(error.response?.data?.message ||
                "Created Product failed", {
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
export const useFeaturedProducts = () => {
    return useQuery({
        queryKey: ["featuredProducts"],
        queryFn: productService.getFeaturedProducts,
    });
};
export const useProductsByCat = (cat) => {
    return useQuery({
        queryKey: ["productsByCat", cat],
        queryFn: () => productService.getProductsByCat(cat),
    });
};
export const useProduct = (id) => {
    return useQuery({
        queryKey: ["product", id],
        queryFn: () => productService.getProduct(id),
    });
};
export const useUpdateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: productService.updateProduct,
        onMutate: () => {
            toast.loading("Updating Product...", { id: "updateProduct" });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            toast.success("Product Updated Successfully", { id: "updateProduct" });
        },
        onError: (error) => {
            toast.error(error.response?.data?.message ||
                "Update Product failed", {
                id: "updateProduct",
            });
        },
    });
};
export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: productService.deleteProduct,
        onMutate: () => {
            toast.loading("Deleting Product...", { id: "deleteProduct" });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            toast.success("Product Deleted Successfully", { id: "deleteProduct" });
        },
        onError: (error) => {
            toast.error(error.response?.data?.message ||
                "Delete Product failed", {
                id: "deleteProduct",
            });
        },
    });
};
