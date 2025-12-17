import blogModel from "../models/blog.model.js";

// =================== Esta función crea un nuevo blog ===================
export async function createBlogService(
  title,
  img,
  content,
  username,
  likes,
  createdAt
) {
  const blog = await blogModel.findOne({ username }); //busca el usuario para poder hacer la entrada en el blog
  if (!blog) {
    return {
      status: 401,
      message: "User not found, cannot create blog",
    };
  }
  //Si el usuario existe, crea el blog
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

// =================== Esta función obtiene todos los blogs y hace que se visualicen ===================
export async function getAllBlogsService() {
  try {
    //Encuentra los blogs que hay guardados en la base de datos
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
