import { paymentService } from "@/services/payment.service";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export const usePayment = () => {
    return useMutation({
        mutationFn: paymentService.handelPayment,
        onMutate: () => {
            toast.loading("Going To Payment Page", { id: "payment" });
        },
        onError: (error) => {
            toast.error("Some Thing Wrong Please Tray Again Later: " + error?.message, { id: "payment" });
        },
    });
};
export const usePaymentSuccess = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: paymentService.paymentSuccess,
        retry: false,
        onError: (error) => {
            // navigate("/");
            toast.error("Some Thing Wrong Please Tray Again Later: " + error?.message, { id: "paymentSuccess" });
        },
    });
};
