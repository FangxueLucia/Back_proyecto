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
  const token = jwt.sign(
    { username: user.username, email: user.email },
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
    },
  };
}

export async function registerService(username, password) {
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
  console.log(password);
  const newUser = await userModel.create({
    username,
    password: hashedPassword,
  });
  console.log(newUser);
  return {
    status: 201,
    message: "User created successfully",
  };
}
