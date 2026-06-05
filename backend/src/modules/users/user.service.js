import User from "./user.model.js";

export const getUsers = async () => {
  return await User.find().select("-password");
};

import bcrypt from "bcryptjs";

export const createUser = async (data) => {
  const exists = await User.findOne({
    email: data.email,
  });

  if (exists) {
    throw new Error("El correo ya existe");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  return await User.create({
    ...data,
    password: hashedPassword,
  });
};

export const updateUser = async (id, data) => {
  const updateData = {
    name: data.name,
    email: data.email,
    role: data.role,
  };

  if (data.password) {
    updateData.password = await bcrypt.hash(data.password, 10);
  }

  return await User.findByIdAndUpdate(id, updateData, {
    new: true,
  }).select("-password");
};

export const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

import User from "./user.model.js";

export const updateRole = async (id, role) => {
  return await User.findByIdAndUpdate(
    id,
    { role },
    {
      new: true,
    }
  ).select("-password");
};