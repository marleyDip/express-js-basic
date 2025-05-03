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

// Embedded JavaScript Templates
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

/* MongoDB & mongoose */

import { connectDB } from "./config/db.js";
import { Person } from "./models/Person.js";

app.use(express.json());
await connectDB();

// Saving Data in MongoDB

// This handles HTTP POST requests sent to /person.
app.post("/person", async (req, res) => {
  /// console.log(req.body);

  // Assumes the client sends a JSON body like:

  /* Person is a Mongoose model.
  
  This creates a new object based on your schema but doesn't save it yet. */

  // '.save' --> Saves the document to the MongoDB collection (e.g., people).
  // await ensures this runs before continuing.

  try {
    const { name, age, email } = req.body;
    const newPerson = new Person({
      name,
      age,
      email,
    });
    await newPerson.save();
    console.log(newPerson);
    res.send("Person Added");
  } catch (error) {
    res.send(error.message);
  } /* catch (err) {
    if (err.code === 11000) {
      res.status(400).send("Email must be Unique");
    } else {
      res.status(500).send("Server Error");
    }
  } */
});

// Updating Data in MongoDB
app.put("/person", async (req, res) => {
  const { id } = req.body;
  const personData = await Person.findByIdAndUpdate(id, { age: 28 });

  /// const { name, age } = req.body;

  // for find multiple data that match
  // const personData = await Person.find({ name, age });

  // for find single data that match 1st
  // const personData = await Person.findOne({ name, age });

  /// const personData = await Person.findById(id);
  /// personData.age = 30;
  /// await personData.save();

  console.log(personData);
  res.send("Person Found");
});

// deleting data from MongoDB

app.delete("/person/:id", async (req, res) => {
  const { id } = req.params;
  await Person.findByIdAndDelete(id);
  res.send("User Deleted Successfully");
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

// Cookie Parser & Session
import cookieParser from "cookie-parser";
app.use(cookieParser());

app.get("/", (req, res) => {
  /* maxAge: 900000 means the cookie will persist for 15 minutes in the browser.

  It's stored and sent with requests until it expires.*/

  res.cookie("name", "express-app");
  res.send("hello, express");
});

app.get("/fetch", (req, res) => {
  console.log(req.cookies);
  res.send("Api called");
});

app.get("/remove-cookie", (req, res) => {
  res.clearCookie("name");
  res.send("cookie removed");
});

// update cookie

app.use(cookieParser());
app.use(
  session({
    secret: "sample_secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.get("/", (req, res) => {
  res.send("hello, express");
});

app.get("/visit", (req, res) => {
  if (req.session.visitCount) {
    req.session.visitCount++;

    res.send(`You have visited this page ${req.session.visitCount} times`);
  } else {
    req.session.visitCount = 1;
    res.send("This is your first visit to this page");
  }
});

app.get("/remove-visit", (req, res) => {
  req.session.destroy();
  res.send("Session destroyed. Visit count removed.");
});

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
