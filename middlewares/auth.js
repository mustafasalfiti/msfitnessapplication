const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = {
  async requireLogin(req, res, next) {
    let token =
      req.signedCookies["alpha-access"] ||
      req.signedCookies["omega-access"] ||
      undefined;
    if (token !== undefined) {
      const { _id } = jwt.verify(token, "key12345");
      const user = await User.findOne({ _id }, "-password").populate('cart.product').populate('ordered_products.product');
      req.user = user;
      next();
    } else {
      return res.status(200).send(null);
    }
  },
  requireAdmin(req, res, next) {
    if (req.user.type === "admin") {
      next();
    } else {
      return res.status(403).send("You dont have permission to do that");
    }
  }
};
