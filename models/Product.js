const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
  name:String ,
  price:Number,
  amount:Number ,
  type:String,
  images:[String] ,
  description:String,
});

module.exports = mongoose.model('Product' , productSchema);