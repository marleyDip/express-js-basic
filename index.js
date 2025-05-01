import express from "express";
const app = express();

const PORT = 3000;

app.use("/welcome", (req, res, next) => {
  console.log("A new request received at" + "-" + Date.now());
  next();
});

app.get("/", (req, res) => {
  res.send("hello, express!");
});

app.get("/welcome", (req, res) => {
  res.send("welocime to express app");
});

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
