import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new db.Schema({
  name: { type: String },
  email: { type: String },
  username: { type: String, unique: true, required: true },
  password: String,

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

const userModel = db.model("User", userSchema);
userModel.init();
export default userModel;
