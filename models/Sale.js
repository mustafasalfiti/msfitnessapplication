const mongoose = require("mongoose");
const cartSchema = require("./cartSchema");


const saleSchema = new mongoose.Schema({
  products: [cartSchema],
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  cost: Number,
  status: {
    type: String,
    default: "Pending"
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Sale", saleSchema);
