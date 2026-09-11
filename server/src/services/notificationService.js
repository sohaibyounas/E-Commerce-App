const Notification = require("../models/Notification");

const getNotifications = async ({ page = 1, limit = 20 } = {}) => {
  const skip = (page - 1) * limit;

  const [notifications, total, unreadCount] = await Promise.all([
    Notification.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Notification.countDocuments(),
    Notification.countDocuments({ read: false }),
  ]);

  return {
    notifications,
    unreadCount,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};

const getUnreadCount = async () => {
  return await Notification.countDocuments({ read: false });
};

const markAsRead = async (id) => {
  return await Notification.findByIdAndUpdate(
    id,
    { read: true },
    { new: true }
  );
};

const markAllAsRead = async () => {
  return await Notification.updateMany({ read: false }, { read: true });
};

const createNotification = async ({ type, title, message, user }) => {
  return await Notification.create({ type, title, message, user });
};

module.exports = {
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  createNotification,
};
