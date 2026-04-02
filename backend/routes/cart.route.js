import e from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import {
  addToCart,
  deleteCart,
  getCartProducts,
  updateQuantity,
} from "../controllers/cart.controller.js";

const router = e.Router();

router.get("/", protectRoute, getCartProducts);
router.post("/", protectRoute, addToCart);
router.put("/:productId", protectRoute, updateQuantity);
router.delete("/:productId", protectRoute, deleteCart);

export default router;
