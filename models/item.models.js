const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  image: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  qty: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Item", itemSchema);
