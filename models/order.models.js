const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  items: [
    {
      userId: {
        type: String,
        required: true,
      },
      itemId: {
        type: String,
        required: true,
      },
      qty: {
        type: Number,
        required: true,
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  shipping: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Order", orderSchema);
