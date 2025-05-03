import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";

export const app = express();
const PORT = 3000;
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
