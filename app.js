const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const user = require("./routes/user");
const item = require("./routes/item");
const cors = require("cors");

const app = express();
const port = 5000;
app.use(cors({ origin: "*" }));

const url = "mongodb://127.0.0.1/emobile";

mongoose.connect(url, { useNewUrlParser: true });
const con = mongoose.connection;

con.on("open", () => {
  console.log("MongoDB connected!");
});

app.use(express.json());
app.use("/user", user);
app.use("/item", item);
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("get req came for / route");
});

app.listen(port, () => {
  console.log(`app starting on ${port}`);
});
