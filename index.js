import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello, express");
});

const users = [];

// jwt secret key
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  res.send("User Registered Successfully");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.send("Not Authorized");
  }
  const token = jwt.sign({ username }, "test#secret");
  res.json({ token });
});

app.get("/dashboard", (req, res) => {
  try {
    const token = req.header("Authorization");
    const decodedToken = jwt.verify(token, "test#secret");
    if (decodedToken.username) {
      return res.send("Welcome to the dashboard, " + decodedToken.username);
    } else {
      return res.send("Not Authorized");
    }
  } catch (error) {
    res.send("Access denied. Invalid token.");
  }
});

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
