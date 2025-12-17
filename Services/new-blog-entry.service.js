import blogModel from "../models/blog.model.js";

export async function createBlogService(
  title,
  img,
  content,
  username,
  likes,
  createdAt
) {
  const blog = await blogModel.findOne({ username });
  if (!blog) {
    return {
      status: 401,
      message: "User not found, cannot create blog",
    };
  }
  const newBlog = await blogModel.create({
    title,
    img,
    content,
    username,
    likes,
    createdAt,
  });
  return {
    status: 201,
    message: "Blog created successfully",
    newBlog,
  };
}

export async function getAllBlogsService() {
  try {
    const blogs = await blogModel.find().sort({ createdAt: -1 }); //Esto es para que los ordene por los más recientes
    return {
      status: 200,
      message: "Blogs retrieved successfully",
      blogs,
    };
  } catch (error) {
    return {
      status: 500,
      message: "Error retrieving blogs",
      error,
    };
  }
}
