const express = require("express");
const router = express.Router();

const Cart = require("../models/cart.models");
const Item = require("../models/item.models");

//Add
router.post("/", async (req, res) => {
  const cart = new Cart({
    userId: req.body.userId,
    itemId: req.body.itemId,
    qty: req.body.qty,
  });
  try {
    const response = await cart.save();
    const item = await Item.findById(req.body.itemId);
    item.qty = item.qty - req.body.qty;
    const updatedItem = await item.save();
    res.send(updatedItem);
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
    const cart = await Cart.find({ userId: req.params.id });
    const cartWithItemDetails = await Promise.all(cart.map(async (cartItem) => {
        const item = await Item.findById(cartItem.itemId);
        return { ...cartItem.toObject(), itemDetails: item };
      }));

    res.json(cartWithItemDetails);
  } catch (err) {
    res.send("Err: " + err);
  }
});

module.exports = router;
