const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type:String ,
    unique:true ,
    minlength:5 ,
    trim:true ,
    required:true
  } ,
  password : {
    type:String ,
    minlength:6 ,
    required:true

  },
  phone_number:{
    type:String ,
    required:true ,
  } ,
  fullname:String ,
  age:Date ,
  gender:String ,
  address:String ,
  image:String ,
  register_date: {
    type:Date ,
    default:Date.now,
  } ,
  expire_date:Date ,
  branch:String ,
  type:{
    type:String ,
    default:'member',
  },
  token:String
});

userSchema.methods.auth = {
  generateAuthToken() {
    const token = jwt.sign({_id:this._id } , 'key12345').toString();
    this.token = token ;
    this.save();
    return token;
  },

  generateSalts(password) {
    return bcrypt.hashSync(password , 10)
  } ,
  comparePassword(password) {
    return bcrypt.compareSync(password , this.password) ;
  }
}

module.exports = mongoose.model('User' , userSchema);