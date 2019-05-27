const mongoose = require("mongoose");
const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripleSecretKey);
const User = require("../models/User");
const Product = require("../models//Product");
const { requireLogin } = require("../middlewares/auth");
const Sale = require('../models/Sale');

module.exports = app => {
  app.post("/products/charge", requireLogin, async (req, res) => {
    const { token, amount, username } = req.body;

    try {
      const charge = await stripe.charges.create(
        {
          amount,
          currency: "EUR",
          description: "Example charge",
          source: token.id,
          statement_descriptor: "Custom descriptor"
        },
        { stripe_account: "acct_1Eb4oFAfXd8mLGFs" }
      );
      if (charge.status === "succeeded") {
        const user = await User.findOne({ username });
        user.cart.forEach(async ({ product, quantity }, i) => {
          try {
            let foundProduct = await Product.findOne({ _id: product });
            let data = {
              message: `${user.fullname} with username : ${
                user.username
              } had ordered this product`,
              product:{
                name:foundProduct.name ,
                price:foundProduct.price ,
                image:foundProduct.image
              },
              quantity,
              createdDate: new Date(),
              _id: new mongoose.Types.ObjectId()
            };
           let a =  await User.updateMany(
              { type: "admin" },
              { $push: { notifications: data } }
            );
            foundProduct.amount -= quantity;
            foundProduct.save();
          } catch (err) {
            res.status(500).send(err);
            console.log(err);
          }
        });
        user.notifications.push({
          message:
            "Thank you for using our online store we will send you a notification as soon as we ship",
          createdDate: new Date(),
          _id: new mongoose.Types.ObjectId()
        });
        let sale = await new Sale({
          products:user.cart.slice() ,
          cost:amount / 100 ,
          buyer:user
        }).save();
        user.sales.push(sale);
        user.cart = [];
        await user.save();
        res.status(200).send(user);
      }
    } catch (err) {
      res.status(500).send(err);
      console.log(err);
    }
  });
};
