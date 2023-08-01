const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");

const Admin = require("../models/admin.models");

const secretKey = "emobilesecret";

router.post("/login", async (req, res) => {
  try {
    const { adminName, password } = req.body;
    const admin = await Admin.findOne({ adminName });
    if (!admin) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare the provided password with the hashed password
    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate a JWT token and send it in the response
    const token = jwt.sign({ adminName }, secretKey, { expiresIn: "72hr" });

    res.status(201).json({ message: "Admin Login successfully" });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { adminName, password } = req.body;

    // Check if the username is already taken
    const existingAdmin = await Admin.findOne({ adminName });
    if (existingAdmin) {
      return res.status(400).json({ error: "Name already taken" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user to the "database"
    const newAdmin = new Admin({
      adminName: req.body.adminName,
      password: hashedPassword,
    });
    await newAdmin.save();
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    console.error("Error registering Admin:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
