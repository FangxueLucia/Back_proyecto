import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: { type: String },
  email: { type: String },
  username: { type: String, unique: true, required: true },
  password: String,

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

  favorites: [{ type: Schema.Types.ObjectId, ref: "Obra" }],
});

export default model("User", userSchema);
