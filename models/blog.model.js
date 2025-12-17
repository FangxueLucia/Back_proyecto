import mongoose from "mongoose";

const { model } = mongoose;

const blogSchema = new mongoose.Schema({
  title: { type: String },
  img: { type: String },
  content: { type: String },
  username: { type: String },
  likes: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

const Blog = model("Blog", blogSchema);

export default Blog;
