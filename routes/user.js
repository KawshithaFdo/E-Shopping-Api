const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");

const User = require("../models/user.models");
const Admin = require("../models/admin.models");

const secretKey = "emobilesecret";

//Get All
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.send("Err: " + err);
  }
});

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username is already taken
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already taken" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user to the "database"
    const newUser = new User({
      username: req.body.username,
      date_of_birth: req.body.dob,
      password: hashedPassword,
      contact: req.body.contact,
      email: req.body.email,
      address: req.body.address,
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Update
router.put("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    (user.username = req.body.username),
      (user.date_of_birth = req.body.dob),
      (user.password = req.body.password),
      (user.contact = req.body.contact),
      (user.email = req.body.email),
      (user.address = req.body.address);

    const response = await user.save();
    res.json(response);
  } catch (err) {
    res.send("Err: " + err);
  }
});

//Delete
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const response = await user.remove();

    res.json(response);
  } catch (err) {
    res.send("Err: " + err);
  }
});

//Get by Id
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.send("Err: " + err);
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const admin = await Admin.findOne({ adminName: username });

    if (!user) {
      if (!admin) {
        return res.status(404).json({ error: " not found" });
      }
    }

    let passwordMatchUser;
    let passwordMatchAdmin;
    if (!user) {
      passwordMatchAdmin = await bcrypt.compare(password, admin.password);
    } else {
      passwordMatchUser = await bcrypt.compare(password, user.password);
    }
    if (!passwordMatchUser) {
      if (!passwordMatchAdmin) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
    }

    const token = jwt.sign({ username }, secretKey, { expiresIn: "72hr" });
    if (user) {
      res.json({ userDetails: user, Authorization: token, type: "User" });
    } else {
      res.json({ adminDetails: admin, Authorization: token, type: "Admin" });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
