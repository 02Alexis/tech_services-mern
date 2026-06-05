import * as userService from "./user.service.js";

export const getAll = async (req, res) => {
  const users = await userService.getUsers();

  res.json(users);
};

export const create = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const update = async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);

    res.json(user);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const remove = async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);

    res.json({
      message: "Usuario eliminado",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const changeRole = async (req, res) => {
  try {
    const user = await userService.updateRole(
      req.params.id,
      req.body.role
    );

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};