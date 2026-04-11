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

    const lineItems = products.map((p) => {
      const amount = Math.round(p.product.price * 100);
      totalAmount += amount * p.quantity;

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: p.product.name,
            images: p.product.images,
          },
          unit_amount: amount,
        },
        quantity: p.quantity || 1,
      };
    });

    const SHIPPING_FEE = 10;
    lineItems.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Shipping Fee",
          description: "Fixed shipping and handling fee",
        },
        unit_amount: SHIPPING_FEE * 100,
      },
      quantity: 1,
    });

    totalAmount += SHIPPING_FEE * 100;

    let coupon = null;
    if (couponCode) {
      coupon = await Coupon.findOne({
        code: couponCode,
        userId: req.user._id,
        isActive: true,
      });
      if (coupon) {
        totalAmount -= Math.round(
          (totalAmount * coupon.discountPercentage) / 100,
        );
      }
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLINT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLINT_URL}/`,
      discounts: coupon
        ? [
            {
              coupon: await createStripeCoupon(coupon.discountPercentage),
            },
          ]
        : [],
      metadata: {
        userId: req.user._id.toString(),
        couponCode: couponCode || "",
        products: JSON.stringify(
          products.map((p) => ({
            id: p.product._id,
            quantity: p.quantity,
            price: p.product.price,
          })),
        ),
      },
    });

    if (totalAmount >= 5000) {
      await createNewCoupon(req.user._id);
    }
    res.status(200).json({ url: session.url, totalAmount: totalAmount / 100 });
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

    const existingOrder = await Order.findOne({ stripeSessionId: sessionId });

    if (existingOrder) {
      return res.status(200).json({
        message: "Order already processed.",
        orderId: existingOrder._id,
      });
    }
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
          product: p.id,
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
