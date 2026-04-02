import redis from "../config/redis.js";
import Product from "../models/product.model.js";

export const updateFeaturedProductsCache = async () => {
  try {
    const featuredProducts = await Product.find({ isFeatured: true });

    await redis.set("featuredProducts", JSON.stringify(featuredProducts));
  } catch (error) {
    console.log("Error In Caching Featured Products Function", error);
  }
};
