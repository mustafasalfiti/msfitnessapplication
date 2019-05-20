const Product = require("../models/Product");
const { requireLogin, requireAdmin } = require("../middlewares/auth");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

storageMember = multer.diskStorage({
  filename: (req, file, cb) => {
    console.log(req.body);
    const name = req.body.image || `product${req.body.random}`;
    cb(null, name);
  },
  destination: (req, file, cb) => {
    const url = "/../client/public/uploads/products/";
    const name = req.body.image || `product${req.body.random}`;
    const dir = path.join(`${__dirname}${url}${name}`);
    try {
      if (fs.existsSync(dir)) {
        fs.readdirSync(dir).forEach(file => {
          fs.unlinkSync(`${__dirname}${url}${name}/${file}`);
        });
        cb(null, dir);
      } else {
        fs.mkdirSync(dir);
        cb(null, dir);
      }
    } catch (err) {
      console.log(err);
    }
  }
});

const upload = multer({
  storage: storageMember,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(new Error("you can only upload image"), false);
    }
  },
  limits: { fileSize: 1000 * 1000 * 20 }
});

module.exports = app => {
  app.get("/products", requireLogin, async (req, res) => {
    try {
      const products = await Product.find({});
      res.status(200).json(products);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  app.post(
    "/products",
    requireLogin,
    requireAdmin,
    upload.single("imageFile"),
    async (req, res) => {
      console.log(req.body)
      if (req.file) {
        req.body.image = req.file.filename;
      }
      try {
        const product = await new Product(req.body);
        await product.save();
        res.status(200).json(product);
      } catch (err) {
        res.status(500).send(err);
      }
    }
  );

  app.get("/products/:id", requireLogin, async (req, res) => {
    try {
      const product = await Product.findOne({ _id: req.params.id });
      res.status(200).json(product);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  app.put(
    "/products/:id",
    requireLogin,
    requireAdmin,
    upload.single("imageFile"),
    async (req, res) => {
      if (req.file) {
        req.body.image = req.file.filename;
      }
      try {
        const product = await Product.findOneAndUpdate(
          { _id: req.params.id },
          req.body,
          { new: true }
        );
        res.status(200).json(product);
      } catch (err) {
        res.status(500).send(err);
      }
    }
  );

  app.delete("/products/:id", requireLogin, requireAdmin, async (req, res) => {
    try {
      let product = await Product.findOneAndRemove({ _id: req.params.id });
      const url = "/../client/public/uploads/products/";
      const dir = path.join(`${__dirname}${url}${product.image}`);

      if (fs.existsSync(dir)) {
        fs.readdirSync(dir).forEach(file => {
          fs.unlinkSync(`${__dirname}${url}${product.image}/${file}`);
        });
        fs.rmdir(dir, err => {
          if (err) {
            new Error(err);
          } else {
            console.log("Everything went well");
          }
        });
      }
      res.status(200).json("Successfully Deleted");
    } catch (err) {
      res.status(500).send(err);
    }
  });
};
