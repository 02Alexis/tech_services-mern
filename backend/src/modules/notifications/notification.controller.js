import * as service from "./notification.service.js";

export const getAll = async (req, res) => {
  const data = await service.getNotifications();

  res.json(data);
};

export const read = async (req, res) => {
  const data = await service.markAsRead(req.params.id);

  res.json(data);
};
