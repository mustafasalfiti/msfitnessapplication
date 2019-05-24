const mongoose = require("mongoose");

const { Schema } = mongoose;

module.exports = new Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  },
  quantity: {
    type: Number,
    default: 1
  } ,
});
