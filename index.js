/// const express = require("express");

import express from "express";
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

/* In Node.js, particularly when using frameworks like Express.js, params refers to route parameters—variables captured from the URL path. 

These parameters are part of the route definition and can be accessed using [req.params]. */

/* If you visit /user/123, req.params.id will be "123".

    params is an object: { id: '123' }. */

/// Define a route with a parameter called "[:username]"

app.get("/user/:username", (req, res) => {
  const username = req.params.username; // Extracts the "id" from the URL
  console.log("username", username); // Logs it to the console
  res.send(`Welcome ${username}`); // Sends it in the response
});

/* req.query in Node.js (with Express) is used to access query string parameters from the URL. 

These are the key-value pairs sent after the ? symbol in a URL. */

/* req.query is: { q: 'books' }

    keyword is: 'books'

    Response: Searching for: books

Summary:
    req.query is an object containing URL query parameters.

    Use it for optional data like filters, search terms, pagination, etc.

    Works with GET requests (and sometimes POST if query strings are used in the URL). */

// /search?keyword=express

app.get("/search", (req, res) => {
  const keyword = req.query.keyword;
  res.send(`Searching for ${keyword}`);
});

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
