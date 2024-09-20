const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order-controller");

router.get("/all",orderController.getUserOrders)
router.post("/create", orderController.createOrder);