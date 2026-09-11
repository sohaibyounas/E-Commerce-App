import API from "./api";

export const fetchNotifications = async (page = 1) => {
  const response = await API.get(`/notifications?page=${page}`);
  return response.data;
};

export const fetchUnreadCount = async () => {
  const response = await API.get("/notifications/unread-count");
  return response.data;
};

export const markNotificationRead = async (id) => {
  const response = await API.patch(`/notifications/${id}/read`);
  return response.data;
};

export const markAllNotificationsRead = async () => {
  const response = await API.patch("/notifications/read-all");
  return response.data;
};
