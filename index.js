import express from "express";
import cookieParser from "cookie-parser";

export const app = express();
const PORT = 3000;
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

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
