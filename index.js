import express from "express";
import { connectDB } from "./config/db.js";
import { Person } from "./models/Person.js";

export const app = express();
const PORT = 3000;

app.use(express.json());

await connectDB();
app.get("/", (req, res) => {
  res.send("hello, express");
});

// Saving Data in MongoDB

// This handles HTTP POST requests sent to /person.
app.post("/person", async (req, res) => {
  /// console.log(req.body);

  // Assumes the client sends a JSON body like:
  const { name, age, email } = req.body;

  /* Person is a Mongoose model.
  
  This creates a new object based on your schema but doesn't save it yet. */

  const newPerson = new Person({
    name,
    age,
    email,
  });
  // '.save' --> Saves the document to the MongoDB collection (e.g., people).
  // await ensures this runs before continuing.
  await newPerson.save();
  console.log(newPerson);
  res.send("Person Added");
});

// Updating Data in MongoDB
app.put("/person", async (req, res) => {
  const { id } = req.body;
  const personData = await Person.findByIdAndUpdate(id, { age: 28 });

  /* const personData = await Person.findById(id);
  personData.age = 30;
  await personData.save();
 */
  console.log(personData);
  res.send("Person Found");
});

// deleting data from MongoDB

app.delete("/person/:id", async (req, res) => {
  const { id } = req.params;
  await Person.findByIdAndDelete(id);
  res.send("User Deleted Successfully");
});

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
