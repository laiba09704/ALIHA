const express = require("express");
const jwt = require("jsonwebtoken");
const Order = require("../models/Order");

const User = require("../models/User");

const router = express.Router();

// middleware (token check)
const protect = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No token" });
  }

  try {
    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// CREATE ORDER (BUY NOW)
router.post("/create", protect, async (req, res) => {
  try {
    const { product, quantity, shippingDetails, totalPrice } = req.body;

    const user = await User.findById(req.userId);
    const userName = user ? user.name : "Unknown User";

    const order = await Order.create({
      userId: req.userId,
      userName,
      productName: product.name,
      product,
      quantity,
      totalPrice: totalPrice || (product.price * quantity + 200),
      shippingDetails,
    });

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET USER ORDERS
router.get("/", protect, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId }).sort({
      createdAt: -1,
    });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;