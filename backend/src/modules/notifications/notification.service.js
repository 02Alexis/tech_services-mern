import Notification from "./notification.model.js";

export const createNotification = async (title, message, type, serviceId) => {
  return await Notification.create({
    title,
    message,
    type,
    serviceId,
  });
};

export const getNotifications = async () => {
  return await Notification.find()
    .sort({
      createdAt: -1,
    })
    .limit(30);
};

export const markAsRead = async (id) => {
  return await Notification.findByIdAndUpdate(
    id,
    {
      read: true,
    },
    {
      returnDocument: "after",
    },
  );
};
