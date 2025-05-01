import mongoose from "mongoose";

export const connectDB = async () => {
  const MONGODB_URI =
    "mongodb+srv://dipakand:dipakand@cluster0.fmc7yyj.mongodb.net/express";

  await mongoose.connect(MONGODB_URI).then(() => {
    console.log("Database Connected");
  });
};
