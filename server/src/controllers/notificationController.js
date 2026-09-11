const notificationService = require("../services/notificationService");

const getNotifications = async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const data = await notificationService.getNotifications({
      page: Number(page),
      limit: Number(limit),
    });
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

const getUnreadCount = async (req, res, next) => {
  try {
    const count = await notificationService.getUnreadCount();
    res.status(200).json({ success: true, data: { unreadCount: count } });
  } catch (error) {
    next(error);
  }
};

const markAsRead = async (req, res, next) => {
  try {
    await notificationService.markAsRead(req.params.id);
    res.status(200).json({ success: true, message: "Marked as read" });
  } catch (error) {
    next(error);
  }
};

const markAllAsRead = async (req, res, next) => {
  try {
    await notificationService.markAllAsRead();
    res.status(200).json({ success: true, message: "All marked as read" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
};
