const { Router } = require("express");
const { BookModel } = require("../model/book.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { auth } = require("../middleware/auth.middleware");

const bookRouter = Router();

// Get
bookRouter.get("/books", async (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, "masai");
  const { category, author } = req.query;

  let query = {};
  if (category) {
    query.category = category;
  }
  if (author) {
    query.author = author;
  }
  try {
    const book = await BookModel.find(query);
    res.status(200).send(book);
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

bookRouter.get("/books/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const book = await BookModel.find({ _id: id });
    res.status(200).send(book);
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

// Post
bookRouter.post("/books", auth, async (req, res) => {
  const payload = req.body;
  try {
    const book = new BookModel(payload);
    await book.save();
    res.status(201).send({ message: "Book has been Added" });
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

// Patch
bookRouter.patch("/books/:id", auth, async (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  try {
    const book = await BookModel.findByIdAndUpdate({ _id: id }, payload);
    res.status(204).send({ message: "book Updated" });
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

// Delete
bookRouter.delete("/books/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const book = await BookModel.findByIdAndDelete({ _id: id });
    res.status(202).send({ message: "book Deleted" });
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

module.exports = { bookRouter };
