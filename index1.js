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

// Middleware
app.use((req, res, next) => {
  console.log("start");

  res.on("finish", () => {
    console.log("End");
  });
  next();
});

app.get("/", (req, res) => {
  console.log("middleware");
  res.send("hello, express!");
});

app.get("/error", () => {
  throw new Error("this is test error");
});

app.use((err, req, res, next) => {
  console.error(err.message);
  res.send("internal  server error");
});

// set ejs as the view engine
app.set("view engine", "ejs"); // use EJS as the templating engine

app.get("/", (req, res) => {
  const userName = "Dip Akand";
  res.render("index", { userName });
});

// Fetch folder

app.use("/public", express.static("public"));
app.use("/images", express.static("images"));

// fetch form data

import multer from "multer";
import { storage } from "./config/multer.js";
import { app } from "./index.js";
import { Person } from "./models/Person.js";

const upload = multer({
  storage,
  limits: {
    fileSize: 1024000,
  },
});

app.use(express.urlencoded({ extended: true }));
app.use(upload.single("image"));
app.use(upload.array("image", 2));

app.post("/form", (req, res) => {
  console.log(req.body);
  console.log(req.file);
  res.send("Form Received");
});

// Saving Data in MongoDB
app.post("/person", async (req, res) => {
  /// console.log(req.body);
  const { name, age, email } = req.body;

  const newPerson = new Person({
    name,
    age,
    email,
  });
  await newPerson.save();
  console.log(newPerson);
  res.send("Person Added");
});

// Updating Data in MongoDB
app.put("/person", async (req, res) => {
  /// const { name, age } = req.body;

  // for find multiple data that match
  // const personData = await Person.find({ name, age });

  // for find single data that match 1st
  // const personData = await Person.findOne({ name, age });

  console.log(personData);
  res.send("Person Found");
});

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
