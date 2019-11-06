const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = (req, res, next) => {
  const header = req.headers.authorization || "";
  const [bearer, token] = header.split(" ");

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({
          errors: {
            global: "Invalid token"
          }
        });
      } else {
        User.findOne({ email: decoded.email }).then(user => {
          req.currentUser = user;
          next();
        });
      }
    });
  } else {
    req.currentUser = false;
    next();
  }
};
