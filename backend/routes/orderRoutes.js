// routes/orderRoutes.js
const express = require("express");
const router = express.Router();
const { createOrder, getAllOrders } = require("../controllers/orderController");

// Create order + send email
router.post("/send-order-email", createOrder);

// Get all orders
router.get("/all", getAllOrders);

module.exports = router;
