import api from "@/lib/axios";

export const CouponService = {
  getCoupons: async () => {
    const { data } = await api.get("/coupons");
    return data;
  },

  validateCoupon: async (code: string) => {
    const { data } = await api.post("/coupons/validate", { code });
    return { data };
  },
};
