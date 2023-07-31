const express = require("express");
const router = express.Router();

const Cart = require("../models/cart.models");

//Add
router.post("/cart", async (req, res) => {
  const cart = new Cart({
    userId: req.body.id,
    itemId: req.body.items,
    qty: req.body.qty,
  });
  try {
    const response = await cart.save();
    res.json(response);
  } catch (err) {
    res.send("Err: " + err);
  }
});

//Update
router.put("/:id", async (req, res) => {
  try {
    const cart = await Cart.find({ userId: req.params.userId });
    (cart.itemId = req.body.itemId), (user.qty = req.body.qty);
    const response = await cart.save();
    res.json(response);
  } catch (err) {
    res.send("Err: " + err);
  }
});

//Delete
router.delete("/:id", async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    const response = await cart.remove();
    res.json(response);
  } catch (err) {
    res.send("Err: " + err);
  }
});

//Get by user
router.get("/:id", async (req, res) => {
  try {
    const cart = await Cart.find({ userId: req.params.userId });
    res.json(cart);
  } catch (err) {
    res.send("Err: " + err);
  }
});


module.exports = router;
