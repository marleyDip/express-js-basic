/// const express = require("express");

import express from "express";
import router from "./route.js";

const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("hello, express?React Full Stack Developer");
});

app.use("/user", router);

app.use(express.json());

// Send data to the server & create new resources
app.post(
  "/users",
  /* express.json(), */ (req, res) => {
    const { name, email } = req.body;
    res.json({
      message: `User ${name} with email ${email} created successfully`,
    });
  }
);

// Update data / resources
app.put(
  "/users/:id",
  /* express.json(), */ (req, res) => {
    const userId = req.params.id;
    const { name, email } = req.body;
    res.json({
      message: `User ${userId} updated to ${name}, ${email}`,
    });
  }
);

app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  res.json({
    message: `User with Id ${userId} deleted successfully`,
  });
});

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
