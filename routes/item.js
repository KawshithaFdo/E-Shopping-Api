const express = require("express");
const router = express.Router();

const Item = require("../models/item.models");

//Get All
router.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.send("Err: " + err);
  }
});

//Add
router.post("/", async (req, res) => {
  const item = new Item({
    image: req.body.image,
    name: req.body.name,
    qty: req.body.qty,
    price: req.body.price,
    category: req.body.category,
  });
  try {
    const response = await item.save();
    res.json(response);
  } catch (err) {
    res.send("Err: " + err);
  }
});

//Update
router.put("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    (item.image = req.body.image),
      (item.name = req.body.name),
      (item.qty = req.body.qty),
      (item.price = req.body.price),
      (item.category = req.body.category);
    const response = await item.save();
    res.json(response);
  } catch (err) {
    res.send("Err: " + err);
  }
});

//Delete
router.delete("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    const response = await item.remove();
    res.status(201).json({ message: "Item Deleted successfully." });
  } catch (err) {
    res.send("Err: " + err);
  }
});

//Get by item Id
router.get("/id", async (req, res) => {
  try {
    const item = [await Item.findById({ _id: req.params.id })];
    res.json(item);
  } catch (err) {
    res.send("Err: " + err);
  }
});
//Get by item Category
router.get("/category", async (req, res) => {
  try {
    const apple = await Item.find({ category: "Iphone" });
    const android = await Item.find({ category: "Android" });
    const huawei = await Item.find({ category: "Huawei" });
    const redmi = await Item.find({ category: "Redmi" });
    const oppo = await Item.find({ category: "Oppo" });

    res.json({
      Apple: apple,
      Android: android,
      Huawei: huawei,
      Redmi: redmi,
      Oppo: oppo,
    });
  } catch (err) {
    res.send("Err: " + err);
  }
});

module.exports = router;
