import express from "express";
const app = express();

const PORT = 3000;

app.use("/public", express.static("public"));
app.use("/images", express.static("images"));

app.get("/", (req, res) => {
  res.send("hello, express");
});

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
