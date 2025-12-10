import userModel from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function loginService(username, password) {
  const user = await userModel.findOne({ username });
  console.log(user);

  if (!user) {
    return {
      status: 404,
      message: "User not found",
    };
  }

  const isPasswordValid = await bcrypt.compare(
    password.toString(),
    user.password
  );

  if (!isPasswordValid) {
    return {
      status: 401,
      message: "Invalid password",
    };
  }

  // Token con rol
  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role, // incluyo el rol en el token
    },
    process.env.JWT_SECRET,
    { expiresIn: "3h" }
  );

  console.log("-----------------------------------------");
  console.log("¡TOKEN JWT GENERADO Y LISTO PARA ENVIARSE!");
  console.log(`Token: ${token}`);
  console.log("-----------------------------------------");

  return {
    status: 200,
    message: {
      token: token,
      role: user.role, // Para el front es util
    },
  };
}

export async function registerService(name, email, username, password) {
  const user = await userModel.findOne({ username });

  if (user) {
    return {
      status: 409,
      message: "User already exists",
    };
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password.toString(), saltRounds);
  console.log(hashedPassword);
  console.log(password, hashedPassword); //eliminar después el hashedPassword

  // Crea el usuario con rol "user" por defecto
  const newUser = await userModel.create({
    name,
    email,
    username,
    password: hashedPassword,
    role: "user", // Admin se crea manualmente en la base de datos
  });

  console.log(newUser);

  return {
    status: 201,
    message: "User created successfully",
  };
}
