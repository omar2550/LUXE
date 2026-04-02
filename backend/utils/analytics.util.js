import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";

export const getAnalyticsData = async () => {
  const [users, products, salesData] = await Promise.all([
    User.countDocuments(),
    Product.countDocuments(),
    Order.aggregate([
      {
        $group: {
          _id: null,
          totalSales: { $sum: 1 },
          totalRevenue: { $sum: "$totalAmount" },
        },
      },
    ]),
  ]);

  const { totalSales = 0, totalRevenue = 0 } = salesData[0] || {};

  return { users, products, totalSales, totalRevenue };
};

export const getDailySalesData = async (startDate, endDate) => {
  const salesRow = await Order.aggregate([
    {
      $match: {
        createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-&d", date: "$createdAt" } },
        sales: { $sum: 1 },
        revenue: { $sum: "$totalAmount" },
      },
    },
  ]);

  const dataMap = new Map(salesRow.map((item) => [item._id, item]));

  return getDatesInRange(startDate, endDate).map((date) => ({
    date,
    sales: dataMap.get(date)?.sales || 0,
    revenue: dataMap.get(date)?.revenue || 0,
  }));
};

/**
 * Generates an array of dates in YYYY-MM-DD format between two given dates.
 * * @param {Date|string} start - The starting date of the range.
 * @param {Date|string} end - The ending date of the range.
 * @returns {string[]} An array of date strings.
 */
const getDatesInRange = (start, end) => {
  // 1. Define the number of milliseconds in one day (24h * 60m * 60s * 1000ms)
  const dayMs = 24 * 60 * 60 * 1000;

  // 2. Calculate the total number of days between start and end (inclusive)
  // Subtracting two dates returns the difference in milliseconds.
  const diffDays = Math.floor((new Date(end) - new Date(start)) / dayMs) + 1;

  // 3. Create a new array with a length equal to the number of days
  // Array.from() takes an object with a length and a mapping function.
  return Array.from({ length: diffDays }, (_, i) => {
    // Create a new date instance based on the start date to avoid mutation
    const date = new Date(start);

    // Add 'i' number of days to the start date for each iteration
    date.setDate(date.getDate() + i);

    // Convert to ISO string (e.g., "2024-08-18T00:00:00.000Z")
    // and split at 'T' to get only the date part "2024-08-18"
    return date.toISOString().split("T")[0];
  });
};
