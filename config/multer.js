import multer from "multer";

/* In the context of filename: (req, file, cb) — often used with Multer (a middleware for handling file uploads in Express), 
the cb stands for "callback". */

/* In Multer’s diskStorage, the cb function is used to:

        --> Pass errors (first argument)

        --> Set the result (second argument) */

/* You pass null as the first argument to the callback when there’s no error.
cb(null, result);   This means:

null → No error occurred
result → The value to pass (e.g., filename) */

/*    Call           |         Meaning 

| `cb(null, value)` | Success — return `value` |
| `cb(error, null)` | Failure — return `error` | */

/* destination: (req, file, cb) => {
    cb(null, 'uploads/'); // set upload folder
  }, */

export const storage = multer.diskStorage({
  destination: "uploads", // set upload folder
  filename: (req, file, cb) => {
    const uniqueName = file.fieldname + "_" + Date.now() + file.originalname;
    cb(null, uniqueName); // this is where cb is used
  },
});
