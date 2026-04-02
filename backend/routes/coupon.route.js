import e from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { getCoupon, validateCoupon } from "../controllers/coupon.controller.js";

const router = e.Router();

router.get("/", protectRoute, getCoupon);
router.post("/validate", protectRoute, validateCoupon);

export default router;
