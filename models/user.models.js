const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  date_of_birth: {
    type: Date,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("User", userSchema);
