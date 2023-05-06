const express = require("express");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.route");
const { auth } = require("./middleware/auth.middleware");
const { bookRouter } = require("./routes/book.route");
const { orderRouter } = require("./routes/order.route");
require("dotenv").config();
var cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.use("/api", userRouter);
app.use("/api", bookRouter);
app.use("/api", orderRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
  }

  console.log(`server running on ${process.env.PORT}`);
});
