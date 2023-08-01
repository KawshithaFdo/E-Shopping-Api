const express = require("express");
const router = express.Router();

const Cart = require("../models/cart.models");
const Item = require("../models/item.models");
const Order = require("../models/order.models");

//Add
router.post("/", async (req, res) => {
  try {
    const { userId, totalAmount, shipping } = req.body;
    const cart = await Cart.find({ userId: userId });

    const order = new Order({
      userId: userId,
      items: cart,
      totalAmount: totalAmount,
      shipping: shipping,
    });
    const savedOrder = await order.save();
    const deleteResult = await Cart.deleteMany({ userId });
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
