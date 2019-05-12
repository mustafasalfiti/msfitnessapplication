const mongoose = require('mongoose');

const { Schema } = mongoose;

const resetPasswordSchema = new Schema({
  code:String ,
  codeManyTyped:{
    default:0,
    type:Number
  } ,
  token:String,
  expireAt: {
    type:Date ,
    default:Date.now ,
    expires:60*60*5
  }


});
module.exports = mongoose.model('resetpassword' , resetPasswordSchema);