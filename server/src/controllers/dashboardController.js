const dashboardService = require("../services/dashboardService");

const getDashboard = async (req, res, next) => {
  try {
    const data = await dashboardService.getDashboardStats();

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getDashboard };
