import api from "../../api/axios";

export const getUsers = async () => {
  const { data } = await api.get("/users");

  return data;
};

export const createUser = async (payload) => {
  const { data } = await api.post("/users", payload);

  return data;
};

export const updateUser = async (id, payload) => {
  const { data } = await api.put(`/users/${id}`, payload);

  return data;
};

export const deleteUser = async (id) => {
  const { data } = await api.delete(`/users/${id}`);

  return data;
};

export const changeRole = async (id, role) => {
  const { data } = await api.put(`/users/${id}/role`, {
    role,
  });

  return data;
};
