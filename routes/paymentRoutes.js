const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripleSecretKey);

module.exports = app => {
  app.post("/products/charge", async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 999,
      currency: "usd",
      description: "Example charge",
      source: token,
      statement_descriptor: "Custom descriptor"
    });
  });
};
