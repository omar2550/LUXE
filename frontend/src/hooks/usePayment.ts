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
      toast.error(
        "Some Thing Wrong Please Tray Again Later: " + error?.message,
        { id: "payment" },
      );
    },
  });
};

export const usePaymentSuccess = () => {
  return useMutation({
    mutationFn: paymentService.paymentSuccess,
    retry: false,
    onSuccess: (data) => {
      console.log("here:", data);
      return data;
    },
    onError: (error) => {
      toast.error(
        "Some Thing Wrong Please Tray Again Later: " + error?.message,
        { id: "paymentSuccess" },
      );
    },
  });
};
