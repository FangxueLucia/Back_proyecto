import userModel from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//Hace posible un inicio de sesión. Comprueba que el usuario exista y que la contraseña sea correcta.
export async function loginService(username, password) {
  const user = await userModel.findOne({ username }).select("+password"); // Busca el usuario por el username y selecciona la contraseña
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
  console.log("¡SE HA GUARDADO EL TOKEN!");
  console.log(`Token: ${token}`);
  console.log("-----------------------------------------");

  return {
    status: 200,
    message: {
      token: token,
      role: user.role, // Para el front es util
      password: user.password,
    },
  };
}

//Genera un usuario nuevo
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
  console.log(password);

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

//Genera el código de verificación
export async function generateCodeService(email) {
  const user = await userModel.findOne({ email });

  if (!user) {
    return {
      status: 404,
      message: "Email not found",
    };
  } else {
    const code = Math.floor(100000 + Math.random() * 999999); // Genera un código aleatorio de 6 dígitos (de 100000 a 999999 para que nunca se superen los 6 dígitos)
    const saltRounds = 10;
    const hashedCode = await bcrypt.hash(code.toString(), saltRounds);
    console.log(hashedCode);
    console.log(code);

    const codeRetriever = await userModel.updateOne(
      {
        email,
      },
      {
        $set: {
          code: hashedCode,
        },
      }
    );
    console.log("actualización: ", codeRetriever);
    const resetToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    //TO DO SEND THE CODE TO THE EMAIL USING API

    console.log(resetToken);
    return {
      status: 200,
      message: "Code sent successfully",
      resetToken,
    };
  }
}

//Comprueba que el código guardado en la base de datos corresponda al email
export async function checkCodeService(checkCode, email) {
  const storedCode = await userModel.findOne({ email }); //busca el código por el email
  if (!storedCode) {
    return {
      status: 404,
      message: "Email not found or code not set",
    };
  }
  console.log("holi");
  const isCodeValid = await bcrypt.compare(
    checkCode.toString(),
    storedCode.code
  );

  if (!isCodeValid) {
    console.log("Nooooo");
    return {
      status: 401,
      message: "Invalid code",
    };
  } else {
    console.log("Siiiiii");
    return {
      //si todo es correcto este mensaje no aparece en la consola del navegador
      status: 200,
      message: "Code found",
    };
  }
}

export async function resetPasswordService(email, password) {
  const storedEmail = await userModel.findOne({ email });

  if (!storedEmail) {
    return {
      status: 404,
      message: "Email not found",
    };
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password.toString(), saltRounds);
  console.log(hashedPassword);
  console.log(password);

  const retrievedPassword = await userModel.updateOne(
    { email: email }, //Filtro para buscar el email
    { $set: { password: hashedPassword } } //Actualiza la contraseña
  );
  console.log("actualización: ", retrievedPassword);

  return {
    status: 200,
    message: "Password reset successfully",
  };
}
