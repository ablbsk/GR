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

module.exports = mongoose.model("BookCollection", schema);
