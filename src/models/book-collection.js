/*import mongoose from "mongoose";*/

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  list: {
    type: Array,
    default: []
  },
  likeBookList: {
    type: Array,
    default: []
  }
});

// export default mongoose.model("BookCollection", schema);
module.exports = mongoose.model("BookCollection", schema);
