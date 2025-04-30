/// const express = require("express");

import express from "express";

import {
  filterId,
  searchController,
  usernameController,
} from "./controller.js";

const app = express();

const PORT = 3000;

// define a simple route

app.get("/", (req, res) => {
  res.send("hello, express?React Full Stack Developer");
});

// about route
app.get("/about", (req, res) => {
  res.send("This is about route");
});

// contact route
app.get("/contact", (req, res) => {
  res.send("This is contact route");
});

// route parameters
app.get("/users/:username", usernameController);

// query string
app.get("/search", searchController);

// both
app.get("/user/:id", filterId);

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
