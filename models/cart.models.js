const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  itemId: [
    {
      item: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
    },
  ],
  qty: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Cart", cartSchema);
