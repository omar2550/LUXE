import stripe from "../config/stripe.js";
import Coupon from "../models/coupon.model.js";
import Order from "../models/order.model.js";
import { createNewCoupon, createStripeCoupon } from "../utils/payment.util.js";

export const createCheckoutSession = async (req, res) => {
  try {
    const { products, couponCode } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res
        .status(400)
        .json({ message: "Invalid or empty products array" });
    }

    let totalAmount = 0;

    const lineItems = products.map((product) => {
      const amount = (products.price * 100).toFixed(2);
      totalAmount += amount * product.quantity;

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            image: product.image,
          },
          unit_amount: amount,
        },
        quantity: product.quantity || 1,
      };
    });

    let coupon = null;
    if (couponCode) {
      coupon = await Coupon.findOne({
        code: couponCode,
        userId: req.user._id,
        isActive: true,
      });
      if (coupon) {
        totalAmount -= (
          (totalAmount * coupon.discountPercentage) /
          100
        ).toFixed(2);
      }
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLINT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLINT_URL}/purchase-cancel`,
      discounts: coupon
        ? [
            {
              coupon: await createStripeCoupon(coupon.discountPercentage),
            },
          ]
        : [],
      metadata: {
        userId: req.user._id.toString(),
        coupon: couponCode || "",
        products: JSON.stringify(
          products.map((p) => ({
            id: p._id,
            quantity: p.quantity,
            price: p.price,
          })),
        ),
      },
    });

    if (totalAmount >= 50000) {
      await createNewCoupon(req.user._id);
    }

    res.status(200).json({ id: session.id, totalAmount: totalAmount / 100 });
  } catch (error) {
    console.error("Error processing checkout:", error);
    res
      .status(500)
      .json({ message: "Error processing checkout", error: error.message });
  }
};

export const checkoutSuccess = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      // Update isActive If Coupon used
      if (session.metadata.couponCode) {
        await Coupon.findOneAndUpdate(
          {
            code: session.metadata.couponCode,
            userId: session.metadata.userId,
          },
          { isActive: false },
        );
      }

      // create order
      const products = JSON.parse(session.metadata.products);
      const newOrder = new Order({
        user: session.metadata.userId,
        products: products.map((p) => ({
          product: p._id,
          price: p.price,
          quantity: p.quantity,
        })),
        totalAmount: session.amount_total / 100,
        stripeSessionId: sessionId,
      });

      await newOrder.save();

      res.status(201).json({
        message:
          "Payment successful, order created, and coupon deactivated if used.",
        orderId: newOrder._id,
      });
    }
  } catch (error) {
    console.error("Error processing checkout success:", error);
    res.status(500).json({
      message: "Error processing checkout success",
      error: error.message,
    });
  }
};
