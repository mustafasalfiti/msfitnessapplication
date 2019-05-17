const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const ResetPassword = require("./ResetPassword");
const cartSchema = require("./Cart");

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    minlength: 5,
    trim: true,
    required: true
  },
  password: {
    type: String,
    minlength: 6,
    required: true
  },
  phone_number: {
    type: String,
    required: true
  },
  fullname: String,
  birthday: Date,
  gender: String,
  address: String,
  image: String,
  register_date: {
    type: Date,
    default: Date.now
  },
  expire_date: Date,
  branch: String,
  type: {
    type: String,
    default: "member"
  },
  cart: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      },
      quantity: {
        type: Number,
        default: 1
      }
    }
  ],
  isExpire: {
    type: Boolean,
    default: false
  },
  token: String,
  resetPassword: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "resetpassword"
  }
});

userSchema.methods.auth = {
  generateAuthToken() {
    const token = jwt.sign({ _id: this._id }, "key12345").toString();
    this.token = token;
    this.save();
    return token;
  },

  generateSalts(password) {
    return bcrypt.hashSync(password, 10);
  },
  comparePassword(password) {
    return bcrypt.compareSync(password, this.password);
  }
};

userSchema.methods.handleResetPassword = {
  async saveCode(code) {
    this.resetPassword = new ResetPassword({ code });
    this.resetPassword.save();
    this.save();
  },
  async timesRequested() {
    this.resetPassword.codeManyTyped += 1;
    await this.resetPassword.save();
    return this.resetPassword.codeManyTyped;
  },
  async saveToken(token) {
    this.resetPassword.token = token;
    await this.resetPassword.save();
  }
};

userSchema.statics.filterMembers = async function() {
  let members = await this.find({ type: "member" }, "-password");
  members.forEach(member => {
    if (member.expire_date <= Date.now()) {
      member.isExpire = true;
      member.save();
    }
    if (member.expire_date >= Date.now() && member.isExpire) {
      member.isExpire = false;
      member.save();
    }
  });
  return members;
};

module.exports = mongoose.model("User", userSchema);
