import * as userService from "./user.service.js";

export const getAll =
  async (req, res) => {

    const users =
      await userService.getUsers();

    res.json(users);

  };