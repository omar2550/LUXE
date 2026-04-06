import mongoose from "mongoose";

import cloudinary from "../config/cloudinary.js";
import redis from "../config/redis.js";
import Product from "../models/product.model.js";
import { updateFeaturedProductsCache } from "../utils/product.util.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    res.status(200).json(products);
  } catch (error) {
    console.log("Error In getAllProducts Controller", error.message);
    res
      .status(500)
      .json({ error: `Error In getAllProducts Controller ${error}` });
  }
};

export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const product = await Product.findById(id);

    if (!product) return res.status(404).json({ message: "Not Found" }).lean();

    res.status(200).json(product);
  } catch (error) {
    console.log("Error In getProduct Controller", error.message);
    res
      .status(500)
      .json({ message: `Error In getProduct Controller ${error.message}` });
  }
};

export const getFeaturedProducts = async (_, res) => {
  try {
    let featureProducts = await redis.get("featuredProducts");

    if (featureProducts) {
      if (typeof featureProducts === "string") {
        try {
          const parsedData = JSON.parse(featureProducts);
          if (Array.isArray(parsedData) && parsedData.length > 0) {
            return res.status(200).json(parsedData);
          }
        } catch (e) {
          console.error("Redis parse error, clearing key...");
          await redis.del("featuredProducts");
        }
      } else if (Array.isArray(featureProducts) && featureProducts.length > 0) {
        return res.status(200).json(featureProducts);
      }
    }

    featureProducts = await Product.find({ isFeatured: true }).lean();

    if (!featureProducts) return res.status(404).json({ message: "Not Found" });

    await redis.set("featuredProducts", JSON.stringify(featureProducts));

    res.status(200).json(featureProducts);
  } catch (error) {
    console.log("Error In getFeaturedProducts Controller", error.message);
    res.status(500).json({
      error: `Error In getFeaturedProducts Controller ${error.message}`,
    });
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const products = await Product.find({ category });

    if (!products) return res.status(404).json({ message: "Not Found" });

    res.status(200).json(products);
  } catch (error) {
    console.log("Error In getProductsByCategory Controller", error.message);
    res
      .status(500)
      .json({ error: `Error In getProductsByCategory Controller ${error}` });
  }
};

export const getRecommendedProducts = async (req, res) => {
  try {
    const products = await Product.aggregate([
      {
        $sample: { size: 4 },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          price: 1,
          image: 1,
        },
      },
    ]);

    res.status(200).json(products);
  } catch (error) {
    console.log("Error In getRecommendedProducts Controller", error.message);
    res
      .status(500)
      .json({ error: `Error In getRecommendedProducts Controller ${error}` });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, images, price, category, stock } = req.body;

    if (!images && !Array.isArray(images))
      return res.status(400).json({ message: "Invalid Image Format" });

    const uploadPromises = images.map((img) =>
      cloudinary.uploader.upload(img, { folder: "products" }),
    );

    const uploadResults = await Promise.all(uploadPromises);
    const imageUrls = uploadResults.map((img) => img.secure_url);

    const product = await Product.create({
      name,
      description,
      price,
      category,
      images: imageUrls,
      stock: stock,
    });

    res.status(201).json({ product, message: "Product Created Successfully" });
  } catch (error) {
    console.log("Error In createProduct Controller", error.message);
    res
      .status(500)
      .json({ error: `Error In createProduct Controller ${error}` });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, images, price, category, stock, isFeatured } =
      req.body;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid ID" });

    // [ ] TODO
    // we will need to delete the previous Image if updated

    let updatedData = { name, description, price, category, stock, isFeatured };

    if (images && Array.isArray(images) && images.length > 0) {
      const uploadPromises = images.map((img) =>
        cloudinary.uploader.upload(img, { folder: "products" }),
      );
      const uploadResults = await Promise.all(uploadPromises);
      updatedData.images = uploadResults.map((res) => res.secure_url);
    }

    const product = await Product.findByIdAndUpdate(id, updatedData);

    if (!product) return res.status(404).json({ message: "Not Found" });

    if (product.isFeatured !== isFeatured) {
      await updateFeaturedProductsCache();
    }

    res.status(200).json({ product, message: "Product Updated Successfully" });
  } catch (error) {
    console.log("Error In updateProduct Controller", error.message);
    res
      .status(500)
      .json({ error: `Error In updateProduct Controller ${error}` });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid ID" });

    const product = await Product.findByIdAndDelete(id);

    if (!product) return res.status(404).json({ message: "Not Found" });

    res.status(200).json({ product, message: "Product Deleted Successfully" });
  } catch (error) {
    console.log("Error In deleteProduct Controller", error.message);
    res
      .status(500)
      .json({ error: `Error In deleteProduct Controller ${error}` });
  }
};

export const toggleFeaturedProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: "Not Found" });

    product.isFeatured = !product.isFeatured;

    const updatedProduct = await product.save();

    await updateFeaturedProductsCache();

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log("Error In toggleFeaturedProduct Controller", error.message);
    res
      .status(500)
      .json({ error: `Error In toggleFeaturedProduct Controller ${error}` });
  }
};
