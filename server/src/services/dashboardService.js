const Product = require("../models/Product");
const Category = require("../models/Category");
const User = require("../models/User");
const Order = require("../models/Order");

const getDashboardStats = async () => {
  const [
    totalProducts,
    totalCategories,
    totalCustomers,
    totalOrders,
    revenueResult,
    pendingOrders,
    recentOrders,
    monthlyRevenue,
  ] = await Promise.all([
    Product.countDocuments(),
    Category.countDocuments(),
    User.countDocuments({ role: "customer" }),
    Order.countDocuments(),
    Order.aggregate([
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]),
    Order.countDocuments({ status: { $in: ["Pending", "Processing", "Shipped"] } }),
    Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("customer", "name email")
      .select("customerName totalAmount status createdAt items")
      .lean(),
    Order.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          revenue: { $sum: "$totalAmount" },
          orders: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": -1, "_id.month": -1 } },
      { $limit: 6 },
    ]),
  ]);

  const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

  const recentOrdersFormatted = recentOrders.map((order) => ({
    id: `#ORD-${String(order._id).slice(-4).toUpperCase()}`,
    customer: order.customerName,
    date: order.createdAt.toISOString().split("T")[0],
    amount: order.totalAmount,
    status: order.status,
  }));

  const monthlyRevenueFormatted = monthlyRevenue.map((item) => ({
    month: item._id.month,
    year: item._id.year,
    revenue: item.revenue,
    orders: item.orders,
  }));

  return {
    stats: {
      totalRevenue,
      totalOrders,
      totalCustomers,
      totalProducts,
      totalCategories,
      pendingDeliveries: pendingOrders,
    },
    recentOrders: recentOrdersFormatted,
    monthlyRevenue: monthlyRevenueFormatted,
  };
};

module.exports = { getDashboardStats };
