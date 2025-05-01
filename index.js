import express from "express";
const app = express();

const PORT = 3000;

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

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
