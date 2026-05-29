import {
  registerUser,
  loginUser
} from "./auth.service.js";

import {
  registerSchema,
  loginSchema
} from "./auth.validation.js";

import User from "../users/user.model.js";

export const register = async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const data = registerSchema.parse(req.body);

    const user = await registerUser(data);

    res.status(201).json(user);
  } catch (error) {
    console.log(error);

    res.status(400).json({
      message: error.message
    });
  }
};

export const login = async (
  req,
  res
) => {

  try {

    const data =
      loginSchema.parse(
        req.body
      );

    const result =
      await loginUser(
        data.email,
        data.password
      );

    res.json(result);

  } catch (error) {

    res.status(400).json({
      message: error.message
    });

  }

};

export const profile = async (
  req,
  res
) => {

  const user =
    await User.findById(
      req.user.id
    ).select("-password");

  res.json(user);

};