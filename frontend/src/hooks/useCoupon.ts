import { CouponService } from "@/services/coupon.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useCoupon = () => {
  return useQuery({
    queryKey: ["coupon"],
    queryFn: CouponService.getCoupons,
  });
};

export const useValidateCoupon = () => {
  return useMutation({
    mutationFn: CouponService.validateCoupon,
    onError: () => {
      toast.error("Coupon is Not Valid");
    },
  });
};
