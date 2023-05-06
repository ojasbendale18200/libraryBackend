const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const decoded = jwt.verify(token, "masai");
    if (decoded) {
      next();
    } else {
      res.status(400).send({ message: "Restricted Route Login First!" });
    }
  } else {
    res.status(400).send({ message: "Restricted Route Login First!" });
  }
};

module.exports = { auth };
