const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  user: { type: String, ref: "users" },
  books: [{ type: Object, ref: "books" }],
  totalAmount: Number,
});

const OrderModel = mongoose.model("order", orderSchema);

module.exports = { OrderModel };
