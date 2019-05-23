const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripleSecretKey);
const User = require("../models/User");
const Product = require("../models//Product");
const { requireLogin } = require("../middlewares/auth");

module.exports = app => {
  app.post("/products/charge", requireLogin, async (req, res) => {
    const { token, amount, username } = req.body;
    const admins = await User.find({ type: "admin" });

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
        user.cart.forEach(async ({ product, quantity }) => {
          try {
            let foundProduct = await Product.findOne({ _id: product });
            admins.forEach(admin => {
              admin.notification.push({
                message: `${user.fullname} had order this product`,
                product,
                quantity
              });
            });

            foundProduct.amount -= quantity;
            foundProduct.save();
          } catch (err) {
            res.status(500).send(err);
            console.log(err);
          }
        });
        admins.forEach(admin => admin.save());
        user.myProducts = user.cart.slice(0);
        user.cart = [];
        user.notification.push({
          message: "Thank you for Buying we will ship it as soon as possible"
        });
        await user.save();
        res.status(200).send(user);
      }
    } catch (err) {
      res.status(500).send(err);
      console.log(err);
    }
  });
};
