import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const accessToken = req.cookies["access-token"];

    if (!accessToken)
      return res
        .status(401)
        .json({ message: "Unauthorized - No Access Token Provided" });

    try {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      const user = await User.findById(decoded.userId);

      if (!user) return res.status(404).json({ message: "User Not Found" });

      req.user = user;

      next();
    } catch (error) {
      if (error.name === "TokenExpiredError")
        return res
          .status(401)
          .json({ message: "Unauthorized - Access Token Expired" });
      res.status(401).json(error);
    }
  } catch (error) {
    console.log("Error In protectRoute Middleware", error.message);
    res
      .status(500)
      .json({ error: `Error In protectRoute Middleware ${error.message}` });
  }
};

export const adminRoute = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied - Admin only" });
  }
};
