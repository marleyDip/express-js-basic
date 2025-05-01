import express from "express";
import { connectDB } from "./config/db.js";
import { Person } from "./models/Person.js";

const app = express();
const PORT = 3000;

app.use(express.json());

await connectDB();
app.get("/", (req, res) => {
  res.send("hello, express");
});

// Saving Data in MongoDB
app.post("/person", async (req, res) => {
  /// console.log(req.body);
  const { name, age, email } = req.body;

  const newPerson = new Person({
    name,
    age,
    email,
  });
  await newPerson.save();
  console.log(newPerson);
  res.send("Person Added");
});

// Updating Data in MongoDB
app.put("/person", async (req, res) => {
  const { name } = req.body;
  const personData = await Person.find({ name });

  console.log(personData);
  res.send("Person Found");
});

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
