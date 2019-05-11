const mongoose = require('mongoose');

const { Schema } = mongoose;

const resetPasswordSchema = new Schema({
  code:String ,
  codeManyTyped:Number ,
  createdAt: {
    type:Date ,
    default:Date.now ,
    expires:6000
  }


});
module.exports = mongoose.model('resetpassword' , resetPasswordSchema);