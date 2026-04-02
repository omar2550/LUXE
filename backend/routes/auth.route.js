import e from "express";
import {
  getProfile,
  login,
  logout,
  refreshToken,
  signup,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = e.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh-token", refreshToken);
router.post("/get-profile", protectRoute, getProfile);

export default router;
