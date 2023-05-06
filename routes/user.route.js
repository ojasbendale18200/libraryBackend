const { Router } = require("express");
const { UserModel } = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRouter = Router();

// Register
userRouter.post("/register", async (req, res) => {
  const { name, email, password, isAdmin } = req.body;

  try {
    const user = await UserModel.findOne({ email: email });
    if (user) {
      res.status(400).send({ message: "user Aleready Exist" });
    } else {
      bcrypt.hash(password, 5, async (err, hash) => {
        const saveUser = new UserModel({
          name,
          email,
          password: hash,
          isAdmin,
        });
        await saveUser.save();
        res.status(201).send({ message: "User Registered" });
      });
    }
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

// Login

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email: email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          res.status(201).send({
            message: "Login Successfull",
            token: jwt.sign({ user: user._id }, "masai"),
          });
        } else {
          res.status(400).send({ message: "Wrong Credentials" });
        }
      });
    } else {
      res.status(400).send({ message: "wrong Credentials" });
    }
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

module.exports = { userRouter };
