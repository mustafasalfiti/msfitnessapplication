const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripleSecretKey);
const User = require("../models/User");
const Product = require("../models//Product");
const { requireLogin } = require("../middlewares/auth");

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
        user.cart.forEach(async ({ product , quantity }) => {
          try {
            let foundProduct = await Product.findOne({ _id:product });
            foundProduct.amount -= quantity;
            foundProduct.save();
          } catch (err) {
            res.status(500).send(err);
            console.log(err);
          }
        });
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
