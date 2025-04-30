/// const express = require("express");

import express from "express";
import router from "./route.js";

const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("hello, express?React Full Stack Developer");
});

app.use("/user", router);

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
