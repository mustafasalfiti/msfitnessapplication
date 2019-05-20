const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripleSecretKey);

module.exports = app => {
  app.post("/products/charge", async (req, res) => {
    const { token, amount } = req.body;
    try {
      const charge = await stripe.charges.create(
        {
          amount,
          currency: "EUR",
          description: "Example charge",
          source: token,
          statement_descriptor: "Custom descriptor"
        },
        { stripe_account:'Udemy MS' }
      );
    } catch (err) {
      res.status(500).send(err);
      console.log(err);
    }
  });
};
