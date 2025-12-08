import db from "../config/db.config.js";

const userSchema = new db.Schema({
    username: {type: String, unique: true, required: true}, 
    password: String,
});

const userModel = db.model("User", userSchema);
userModel.init();
export default userModel;