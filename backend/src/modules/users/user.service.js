import User from "./user.model.js";

export const getUsers =
  async () => {

    return await User
      .find()
      .select("-password");

  };