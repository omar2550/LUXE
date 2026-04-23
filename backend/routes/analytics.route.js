import e from "express";
import { adminRoute, protectRoute } from "../middlewares/auth.middleware.js";
import { getAnalytics, getUsers } from "../controllers/analytics.controller.js";

const router = e.Router();

router.get("/", protectRoute, adminRoute, getAnalytics);
router.get("/users", protectRoute, adminRoute, getUsers);

export default router;
