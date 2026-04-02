import jwt from "jsonwebtoken";

import User from "../models/user.model.js";
import {
  generateTokens,
  regenerateAccessToken,
  setCookies,
  storeRefreshToken,
} from "../utils/auth.util.js";
import redis from "../config/redis.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email: email.toLowerCase() });

    if (userExists)
      return res.status(400).json({ message: "User Already Exists" });

    const user = await User.create({ name, email, password });

    // authenticate
    const { accessToken, refreshToken } = generateTokens(user._id);

    await storeRefreshToken(user._id, refreshToken);

    setCookies(res, accessToken, refreshToken);

    res.status(201).json({
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error In signup Controller", error.message);
    res.status(500).json({ message: `Error In signup Controller ${error}` });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) return res.status(404).json({ message: "Invalid credentials" });

    if (!(await user.comparePassword(password)))
      return res.status(400).json({ message: "Invalid email or password" });

    // authenticate
    const { accessToken, refreshToken } = generateTokens(user._id);

    await storeRefreshToken(user._id, refreshToken);

    setCookies(res, accessToken, refreshToken);

    res.status(201).json({
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error In login Controller", error.message);
    res.status(500).json({ message: `Error In login Controller ${error}` });
  }
};

export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
      );
      await redis.del(`refresh-token:${decoded.userId}`);
    }

    res.clearCookie("access-token");
    res.clearCookie("refresh-token");
    res.status(200).json({ message: "Logged out Successfully" });
  } catch (error) {
    console.log("Error In logout Controller", error.message);
    res.status(500).json({ message: `Error In logout Controller ${error}` });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken)
      return res.status(401).json({ message: "No refresh token provided" });

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const storedToken = await redis.get(`refresh-token:${decoded.userId}`);

    if (refreshToken !== storedToken)
      return res.status(401).json({ message: "Invalid refresh token" });

    regenerateAccessToken(decoded.userId);

    res.json({ message: "Token refreshed successfully" });
  } catch (error) {
    console.log("Error In refreshToken Controller", error.message);
    res
      .status(500)
      .json({ message: `Error In refreshToken Controller ${error}` });
  }
};

export const getProfile = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error In getProfile Controller", error.message);
    res
      .status(500)
      .json({ message: `Error In getProfile Controller ${error}` });
  }
};
