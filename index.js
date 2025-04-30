import express from "express";
const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("hello, express?React Full Stack Developer");
});

app.use(express.json());

app.get("/things/:name/:id", (req, res) => {
  const { name, id } = req.params;

  if (!/^\d{5}$/.test(id)) {
    return res.status(400).json({
      error:
        "ID must be exactly 5 digits (0-9). No letters, symbols, or spaces allowed.",
      receivedId: id,
    });
  }

  res.json({ name, id });
});

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
