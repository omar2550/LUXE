import e from "express";
import { adminRoute, protectRoute } from "../middlewares/auth.middleware.js";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getFeaturedProducts,
  getProductsByCategory,
  getRecommendedProducts,
  toggleFeaturedProduct,
  updateProduct,
} from "../controllers/product.controller.js";

const router = e.Router();

router.get("/", protectRoute, adminRoute, getAllProducts);
router.get("/featured", getFeaturedProducts);
router.get("/:category", getProductsByCategory);
router.get("/recommended", getRecommendedProducts);
router.post("/", protectRoute, adminRoute, createProduct);
router.patch("/:id", protectRoute, adminRoute, updateProduct);
router.delete("/:id", protectRoute, adminRoute, deleteProduct);
router.put("/:id", protectRoute, adminRoute, toggleFeaturedProduct);

export default router;
