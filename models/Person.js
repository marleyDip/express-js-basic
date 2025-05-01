import mongoose from "mongoose";

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
});

export const Person = mongoose.model("Person", personSchema);

/* mongoose.model("Person", personSchema)
        --> This creates a model called Person using a schema.

        --> "Person" is the collection name (Mongoose will pluralize it → becomes people in MongoDB).

        --> personSchema - defines the structure (fields, types, validations) for documents.

        --> "Person" inside mongoose.model() defines what collection it connects to.

✅ export const Person = Person is variable name ...
This exports the model so it can be used in other files:

import { Person } from "./models/person.js"; */
