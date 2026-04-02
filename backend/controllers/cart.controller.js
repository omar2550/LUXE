import User from "../models/user.model.js";

export const getCartProducts = async (req, res) => {
  try {
    const cart = await User.findById(req.user._id)
      .select("cartItems")
      .populate("cartItems.product");

    res.status(200).json(cart?.cartItems || []);
  } catch (error) {
    console.log("Error In getCartProducts Controller", error.message);
    res
      .status(500)
      .json({ error: `Error In getCartProducts Controller ${error}` });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user._id;

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId, "cartItems.product": { $ne: productId } },
      { $push: { cartItems: { product: productId } } },
      { new: true },
    ).populate("cartItems.product");

    if (!updatedUser) {
      return res.status(400).json({ message: "Product Already in Your Cart" });
    }

    res.status(200).json(updatedUser.cartItems);
  } catch (error) {
    console.log("Error In addToCart Controller", error.message);
    res.status(500).json({ error: `Error In addToCart Controller ${error}` });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const { quantity } = req.body;
    const { productId } = req.params;
    const userId = req.user._id;

    if (quantity < 0) {
      return res.status(400).json({ message: "Invalid Quantity" });
    }

    if (quantity === 0) {
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { cartItems: { product: productId } } },
        { new: true },
      ).populate("cartItems.product");

      if (!updatedUser) {
        return res.status(404).json({ message: "Product not found in cart" });
      }

      return res.status(200).json(updatedUser.cartItems);
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId, "cartItems.product": productId },
      { $set: { "cartItems.$.quantity": quantity } },
      { new: true },
    ).populate("cartItems.product");

    if (!updatedUser) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    res.status(200).json(updatedUser.cartItems);
  } catch (error) {
    console.log("Error In updateQuantity Controller", error.message);
    res
      .status(500)
      .json({ error: `Error In updateQuantity Controller ${error}` });
  }
};

export const deleteCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { cartItems: { product: productId } } },
      { new: true },
    ).populate("cartItems.product");

    if (!updatedUser) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    return res.status(200).json(updatedUser.cartItems);
  } catch (error) {
    console.log("Error In deleteCart Controller", error.message);
    res.status(500).json({ error: `Error In deleteCart Controller ${error}` });
  }
};
