const Product = require("../models/Product");
const { requireLogin , requireAdmin } = require("../middlewares/auth");

module.exports = app => {
  app.get("/products", requireLogin, async (req, res) => {
    try {
      const products = await Product.find({});
      res.status(200).json(products);
    } catch (err) {
      res.status(400).send("Something went wrong ");
    }
  });

  app.post("/products", requireLogin, requireAdmin, async (req, res) => {
    try {
      const product = await new Product(req.body)
      await product.save();
      res.status(200).json(product);
    } catch (err) {
      res.status(400).send(err);
    }
  });

  app.get("/products/:id", requireLogin, async (req, res) => {
    try {
      const product = await Product.findOne({ _id: req.params.id });
      res.status(200).json(product);
    } catch (err) {
      res.status(400).send("Something went wrong ");
    }
  });

  app.put("/products/:id", requireLogin, requireAdmin, async (req, res) => {
    try {
      const product = await Product.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { $new: true }
      );
      res.status(200).json(product);
    } catch (err) {
      res.status(400).send("Something went wrong");
    }
  });

  app.delete("/products/:id", requireLogin, requireAdmin, async (req, res) => {
    try {
      await Product.findOneAndRemove({ _id: req.params.id });
      res.status(200).json(product);
    } catch (err) {
      res.status(400).send("Something went wrong");
    }
  });
};
