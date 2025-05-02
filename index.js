import express from "express";
import cookieParser from "cookie-parser";

export const app = express();
const PORT = 3000;
app.use(cookieParser());

app.get("/", (req, res) => {
  res.cookie("name", "express-app");
  res.send("hello, express");
});

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
