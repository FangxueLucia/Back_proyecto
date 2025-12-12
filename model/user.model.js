import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: String,
  email: String,

  username: {
    type: String,
    unique: true,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

  favorites: [
    { type: Schema.Types.ObjectId, ref: "Obra" }
  ],
});

export default model("User", userSchema);
