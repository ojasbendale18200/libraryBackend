const { Router } = require("express");
const { auth } = require("../middleware/auth.middleware");
const jwt = require("jsonwebtoken");
const { OrderModel } = require("../model/order.model");

const orderRouter = Router();

orderRouter.post("/order", auth, async (req, res) => {
  const token = req.headers.authorization;
  const { books, totalAmount } = req.body;
  try {
    if (token) {
      const decoded = jwt.verify(token, "masai");
      if (decoded) {
        const order = new OrderModel({
          user: decoded.user,
          books,
          totalAmount,
        });
        await order.save();
        res.status(201).send(order);
      }
    }
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

// get
orderRouter.get("/orders", auth, async (req, res) => {
  try {
    const orders = await OrderModel.find();
    res.status(200).send(orders);
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

module.exports = { orderRouter };
