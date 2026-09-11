import API from "./api";

export const fetchDashboard = async () => {
  const response = await API.get("/dashboard");
  return response.data;
};
