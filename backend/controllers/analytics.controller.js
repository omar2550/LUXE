import User from "../models/user.model.js";
import {
  getAnalyticsData,
  getDailySalesData,
} from "../utils/analytics.util.js";

export const getAnalytics = async (_, res) => {
  try {
    // cache

    const analyticsData = await getAnalyticsData();

    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - 30 * 24 * 60 * 60 * 1000);

    const dailySalesData = await getDailySalesData(startDate, endDate);

    res.status(200).json({ analyticsData, dailySalesData });
  } catch (error) {
    console.log("Error In getAnalytics Controller", error.message);
    res
      .status(500)
      .json({ error: `Error In getAnalytics Controller ${error}` });
  }
};

export const getUsers = async (_, res) => {
  try {
    const users = await User.find({});

    if (!users) return res.status(404).json({ message: "Users Not Found" });

    res.status(200).json({ users });
  } catch (error) {
    console.log("Error In getUsers Controller", error.message);
    res.status(500).json({ message: `Error In getUsers Controller ${error}` });
  }
};
