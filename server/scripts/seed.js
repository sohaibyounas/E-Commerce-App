const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const User = require("../src/models/User");
const Product = require("../src/models/Product");
const Category = require("../src/models/Category");
const Order = require("../src/models/Order");
const connectDB = require("../src/config/db");

dotenv.config();
connectDB();

const seedData = async () => {
  try {
    await Promise.all([
      Order.deleteMany({}),
      Product.deleteMany({}),
      Category.deleteMany({}),
      User.deleteMany({}),
    ]);

    const admin = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "admin123",
      role: "admin",
    });

    const customers = [];
    const customerNames = [
      "John Doe",
      "Jane Smith",
      "Bob Johnson",
      "Alice Brown",
      "Charlie Davis",
      "Emma Wilson",
    ];
    for (let i = 0; i < customerNames.length; i++) {
      const user = await User.create({
        name: customerNames[i],
        email: `customer${i + 1}@example.com`,
        password: "customer123",
        role: "customer",
      });
      customers.push(user);
    }

    const categories = await Category.create([
      { name: "Electronics", description: "Gadgets and devices" },
      { name: "Clothing", description: "Fashion and apparel" },
      { name: "Home & Kitchen", description: "Household items" },
      { name: "Books", description: "Books and stationery" },
    ]);

    const electronics = categories[0];
    const products = await Product.insertMany([
      {
        name: "Wireless Headphones",
        description: "Noise cancelling over-ear headphones",
        price: 120.5,
        category: categories[0]._id,
        image: "/uploads/image-1788867814080-579651033.png",
        stock: 25,
      },
      {
        name: "Smart Watch",
        description: "Fitness tracking smartwatch",
        price: 199.99,
        category: categories[0]._id,
        image: "/uploads/image-1788954192882-619590799.png",
        stock: 15,
      },
      {
        name: "Cotton T-Shirt",
        description: "Premium cotton casual t-shirt",
        price: 24.99,
        category: categories[1]._id,
        image: "/uploads/image-1788954192882-619590799.png",
        stock: 50,
      },
      {
        name: "Denim Jacket",
        description: "Classic blue denim jacket",
        price: 59.99,
        category: categories[1]._id,
        image: "/uploads/image-1788954192882-619590799.png",
        stock: 20,
      },
      {
        name: "Coffee Maker",
        description: "12-cup programmable coffee maker",
        price: 89.0,
        category: categories[2]._id,
        image: "/uploads/image-1788954192882-619590799.png",
        stock: 12,
      },
      {
        name: "Electric Kettle",
        description: "Stainless steel electric kettle",
        price: 35.5,
        category: categories[2]._id,
        image: "/uploads/image-1788954192882-619590799.png",
        stock: 30,
      },
      {
        name: "JavaScript Guide",
        description: "The definitive JavaScript book",
        price: 45.99,
        category: categories[3]._id,
        image: "/uploads/image-1788954192882-619590799.png",
        stock: 40,
      },
    ]);

    const statuses = ["Delivered", "Pending", "Processing", "Shipped"];
    const orders = [];

    for (let i = 0; i < 20; i++) {
      const customer = customers[i % customers.length];
      const product = products[i % products.length];
      const quantity = (i % 3) + 1;
      const price = product.price;
      const created = new Date(
        Date.now() - i * 24 * 60 * 60 * 1000,
      );

      orders.push({
        customer: customer._id,
        customerName: customer.name,
        items: [
          {
            product: product._id,
            name: product.name,
            price,
            quantity,
          },
        ],
        totalAmount: price * quantity,
        status: statuses[i % statuses.length],
        paymentMethod: i % 2 === 0 ? "Card" : "COD",
        createdAt: created,
        updatedAt: created,
      });
    }

    await Order.insertMany(orders);

    console.log("Seeded data successfully!");
    console.log("Admin login -> admin@example.com / admin123");
    console.log("Customer login -> customer1@example.com / customer123");
    console.log(
      `Created: ${customers.length} customers, ${categories.length} categories, ${products.length} products, ${orders.length} orders`,
    );
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
};

seedData();