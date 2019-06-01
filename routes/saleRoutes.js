const Sale = require("../models/Sale");
const User = require("../models/User");
const mongoose = require("mongoose");
const { requireLogin, requireAdmin } = require("../middlewares/auth");
module.exports = app => {
  app.get("/api/sales", requireLogin, requireAdmin, async (req, res) => {
    try {
      const sales = await Sale.find({})
        .populate("products.product")
        .populate("buyer");
      console.log(sales);
      res.status(200).json(sales);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  app.post("/api/sales", requireLogin, requireAdmin, async (req, res) => {
    try {
      const sale = await new Sale(req.body);
      await sale.save();
      res.status(200).json(sale);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  app.get("/api/sales/:id", requireLogin, requireAdmin, async (req, res) => {
    try {
      const sale = await Sale.findOne({ _id: req.params.id })
        .populate("products.product")
        .populate("buyer");
      res.status(200).json(sale);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  app.put("/api/sales/:id", requireLogin, requireAdmin, async (req, res) => {
    try {
      const sale = await Sale.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      )
        .populate("products.product")
        .populate("buyer");
      await User.findOneAndUpdate(
        { username: sale.buyer.username },
        {
          $push: {
            notifications: {
              message: `Your Product/s has/have been marked as ${
                req.body.status
              }`,
              createdDate: new Date(),
              _id: new mongoose.Types.ObjectId()
            }
          }
        }
      );
      res.status(200).json(sale);
    } catch (err) {
      res.status(500).send(err);
      console.log(err);
    }
  });

  app.delete("/api/sale/:id", requireLogin, requireAdmin, async (req, res) => {
    try {
      await Sale.findOneAndRemove({ _id: req.params.id });
      res.status(200).json("Successfully Deleted");
    } catch (err) {
      res.status(500).send(err);
    }
  });
};
