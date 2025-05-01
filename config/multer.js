import multer from "multer";

/* In the context of filename: (req, file, cb) — often used with Multer (a middleware for handling file uploads in Express), 
the cb stands for "callback". */

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
