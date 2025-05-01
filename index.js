import express from "express";
const app = express();

const PORT = 3000;

// set ejs as the view engine
app.set("view engine", "ejs"); // use EJS as the templating engine

app.get("/", (req, res) => {
  const userName = "Dip Akand";
  res.render("index", { userName });
});
app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
