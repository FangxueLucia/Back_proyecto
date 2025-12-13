import db from "../config/db.config.js";

const userSchema = new db.Schema({
  name: { type: String },
  email: { type: String, unique: true, required: true },
  username: { type: String, unique: true, required: true },
  password: String,
  code: String,

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

const userModel = db.model("User", userSchema);
userModel.init();
export default userModel;
