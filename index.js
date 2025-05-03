import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";

export const app = express();
const PORT = 3000;

app.use(express.json());
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

// Sample user data for demonstration
const users = [];

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  users.push({ username, password });
  res.send("User Registered Successfully");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  /* !user: This checks if the user object was not found (e.g., from a database query).

    password !== user.password: This checks if the provided password does not match the stored password. */
  if (!user || password !== user.password) {
    return res.send("Invalid credentials");
  }
  req.session.user = user;
  res.send("User Logged In Successfully");
});

app.get("/dashboard", (req, res) => {
  if (!req.session.user) {
    return res.send("Unauthorized access");
  }
  res.send(`Welcome to your dashboard, ${req.session.user.username}`);
});

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
