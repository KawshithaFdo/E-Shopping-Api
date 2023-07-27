const express = require("express");
const router = express.Router();

const Admin = require("../models/admin.models");

//Add
router.post("/", async (req, res) => {
  const admin = new Admin({
    adminName: req.body.adminName,
    password: req.body.password,
  });
  try {
    const response = await admin.save();
    res.json(response);
  } catch (err) {
    res.send("Err: " + err);
  }
});

//Update
router.put("/:id", async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    (user.adminName = req.body.adminName), (user.password = req.body.password);
    const response = await admin.save();
    res.json(response);
  } catch (err) {
    res.send("Err: " + err);
  }
});

//Delete
router.delete("/:id", async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    const response = await admin.remove();
    res.json(response);
  } catch (err) {
    res.send("Err: " + err);
  }
});

//Get by Id
router.get("/:id", async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    res.json(admin);
  } catch (err) {
    res.send("Err: " + err);
  }
});

//Login
router.post("/:email/:password", async (req, res) => {
  try {
    const user = await User.find({ email: req.params.email });
    for (let i = 0; i < user.length; i++) {
      if (user[i].password == req.params.password) {
        res.send("Email and Password Matched");
      }
    }
  } catch (err) {
    res.send("Err: " + err);
  }
});

module.exports = router;
