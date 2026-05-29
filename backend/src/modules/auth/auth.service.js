import bcrypt from "bcryptjs";
import User from "../users/user.model.js";
import { generateToken } from "../../utils/jwt.js";

export const registerUser = async (data) => {

  const exists = await User.findOne({
    email: data.email
  });

  if (exists) {
    throw new Error(
      "El usuario ya existe"
    );
  }

  const hashedPassword =
    await bcrypt.hash(
      data.password,
      10
    );

  const user = await User.create({
    ...data,
    password: hashedPassword
  });

  return {
    id: user._id,
    name: user.name,
    email: user.email
  };
};

export const loginUser = async (
  email,
  password
) => {

  const user = await User.findOne({
    email
  });

  if (!user) {
    throw new Error(
      "Credenciales inválidas"
    );
  }

  const match =
    await bcrypt.compare(
      password,
      user.password
    );

  if (!match) {
    throw new Error(
      "Credenciales inválidas"
    );
  }

  const token = generateToken({
    id: user._id,
    role: user.role
  });

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  };
};