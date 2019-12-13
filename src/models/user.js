const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uniqueValidator = require('mongoose-unique-validator');

const schema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      index: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
      unique: true
    },
    passwordHash: {
      type: String,
      required: true
    },
    confirmed: {
      type: Boolean,
      default: false
    },
    confirmationToken: {
      type: String,
      default: ""
    },
    bookCollectionId: {
      type: mongoose.Schema.Types.ObjectId
    }
  },
  {
    timestamps: true
  }
);

schema.methods.isValidPassword = function isValidPassword(password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

schema.methods.setPassword = function setPassword(password) {
  this.passwordHash = bcrypt.hashSync(password, 10);
};

schema.methods.setConfirmationToken = function setConfirmationToken() {
  this.confirmationToken = this.generateJWT();
};

schema.methods.generateConfirmationUrl = function generateConfirmationUrl() {
  return `${process.env.HEROKU_URL}/confirmation/${this.confirmationToken}`; //TODO HEROKU_URL | HOST
};

schema.methods.generateResetPasswordLink = function generateResetPasswordLink() {
  return `${process.env.HEROKU_URL}/reset_password/${this.generateResetPasswordToken()}`; //TODO HEROKU_URL | HOST
};

schema.methods.generateJWT = function generateJWT() {
  return jwt.sign(
    {
      email: this.email,
      username: this.username,
      confirmed: this.confirmed
    },
    process.env.JWT_SECRET
  );
};

schema.methods.generateResetPasswordToken = function generateResetPasswordToken() {
  return jwt.sign(
    {
      _id: this._id
    },
    process.env.JWT_SECRET,
    { expiresIn: "10h" }
  );
};

schema.methods.toAuthJSON = function toAuthJSON() {
  return {
    email: this.email,
    username: this.username,
    confirmed: this.confirmed,
    token: this.generateJWT()
  };
};

schema.plugin(uniqueValidator, { message: "This {PATH} is already taken" });

module.exports = mongoose.model("User", schema);
