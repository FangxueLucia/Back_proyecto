import db from "mongoose";
import dotenv from "dotenv";

dotenv.config();

db.connect(process.env.DB)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

export default db;
