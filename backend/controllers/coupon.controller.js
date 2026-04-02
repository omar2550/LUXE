import Coupon from "../models/coupon.model.js";

export const getCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findOne({
      userId: req.user._id,
      isActive: true,
    });
    res.status(200).json(coupon || null);
  } catch (error) {
    console.log("Error In getCoupon Controller", error.message);
    res.status(500).json({ error: `Error In getCoupon Controller ${error}` });
  }
};

export const validateCoupon = async (req, res) => {
  try {
    const { code } = req.body;

    const coupon = await Coupon.findOne({
      userId: req.user._id,
      code,
      isActive: true,
    });

    if (!coupon) return res.status(404).json({ message: "Coupon Not Found" });

    if (coupon.expirationDate < new Date()) {
      coupon.isActive = false;

      await coupon.save();
      return res.status(400).json({ message: "Coupon Expired" });
    }

    res.status(200).json({
      message: "Coupon is Valid",
      code: coupon.code,
      discountPercentage: coupon.discountPercentage,
    });
  } catch (error) {
    console.log("Error In validateCoupon Controller", error.message);
    res
      .status(500)
      .json({ error: `Error In validateCoupon Controller ${error}` });
  }
};
