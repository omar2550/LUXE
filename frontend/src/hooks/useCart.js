import { cartService } from "@/services/cart.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
export const useAddToCart = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: cartService.addToCart,
        onMutate: () => {
            toast.loading("Adding To Cart...", { id: "addToCart" });
        },
        onSuccess: () => {
            toast.success("Added To Cart Successfully", { id: "addToCart" });
            queryClient.invalidateQueries({ queryKey: ["cart"] });
        },
        onError: (error) => {
            toast.error(error.response?.data?.message ||
                "Add To Cart Failed", {
                id: "addToCart",
            });
        },
    });
};
export const useUpdateQuantityCart = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: cartService.updateQuantityCart,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] });
        },
        onError: (error) => {
            toast.error(error.response?.data?.message ||
                "Update Cart Quantity Failed", {
                id: "updateQuantityCart",
            });
        },
    });
};
export const useRemoveFromCart = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: cartService.removeFromCart,
        onMutate: () => {
            toast.loading("Deleting from Cart...", { id: "removeFromCart" });
        },
        onSuccess: () => {
            toast.success("Deleted from Cart Successfully", { id: "removeFromCart" });
            queryClient.invalidateQueries({ queryKey: ["cart"] });
        },
        onError: (error) => {
            toast.error(error.response?.data?.message ||
                "Remove From Cart Failed", {
                id: "removeFromCart",
            });
        },
    });
};
export const useCarts = () => {
    return useQuery({
        queryKey: ["cart"],
        queryFn: cartService.getCart,
    });
};
