const User = require("../models/User");
const Product = require("../models/Product");
const mongoose = require("mongoose");
const { requireLogin, requireAdmin } = require("../middlewares/auth");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

storageMember = multer.diskStorage({
  filename: (req, file, cb) => {
    const username = req.params.username || req.body.username;
    cb(null, username + Date.now());
  },
  destination: (req, file, cb) => {
    const url = "/../client/public/uploads/members/";
    const username = req.params.username || req.body.username;
    if (username.length < 5) {
      return cb(null);
    }
    const dir = path.join(`${__dirname}${url}${username}`);
    try {
      if (fs.existsSync(dir)) {
        fs.readdirSync(dir).forEach(file => {
          fs.unlinkSync(`${__dirname}${url}${username}/${file}`);
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
  app.get("/members", requireLogin, requireAdmin, async (req, res) => {
    try {
      const members = await User.filterMembers();
      res.status(200).send(members);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  app.get("/member/:username", requireLogin, requireAdmin, async (req, res) => {
    try {
      const member = await User.findOne({ username: req.params.username });
      res.status(200).send(member);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  app.get("/members/:username", requireLogin, async (req, res) => {
    try {
      const member = await User.findOne(
        { username: req.params.username },
        "-password"
      );
      res.status(200).json(member);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  app.post(
    "/members",
    requireLogin,
    requireAdmin,
    upload.single("imageFile"),
    async (req, res) => {
      let { username } = req.body;
      username = req.body.username.toLowerCase();
      if (req.file) {
        req.body.image = req.file.filename;
      }

      try {
        const user = await new User({
          ...req.body,
          username
        });

        user.password = user.auth.generateSalts(user.password);
        await user.save();
        res.status(200).json(user);
      } catch (err) {
        res.status(500).json({ ...err, message: err.message });
      }
    }
  );

  app.put(
    "/member/:username",
    requireLogin,
    requireAdmin,
    upload.single("imageFile"),
    async (req, res) => {
      if (req.body.type) {
        req.body.type = undefined;
      }
      if (req.file) {
        req.body.image = req.file.filename;
      }
      try {
        if (req.body.request === "send_notificaton") {
          const member = await User.findOneAndUpdate(
            { username: req.params.username },
            {
              $push: {
                notifications: {
                  message: req.body.notification,
                  createdDate: new Date(),
                  _id: new mongoose.Types.ObjectId()
                }
              }
            },
            { new: true }
          );
          return res.status(200).json(member);
        }
        const member = await User.findOneAndUpdate(
          { username: req.params.username },
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(member);
      } catch (err) {
        res.status(500).send(err);
      }
    }
  );

  app.put(
    "/members/:username",
    requireLogin,
    upload.single("imageFile"),
    async (req, res) => {
      const {
        target,
        productId,
        noti_id,
        request,
        password,
        currentPassword,
        fullname,
        phone_number,
        address,
        birthday
      } = req.body;
      try {
        const member = await User.findOne({
          username: req.params.username
        }).populate({
          path: "cart.product",
          populate: {
            path: "product"
          }
        });
        const product = await Product.findOne({ _id: productId });
        if (password) {
          const isTrue = member.auth.comparePassword(currentPassword);
          if (isTrue) {
            member.password = member.auth.generateSalts(password);
            await member.save();
            return res.status(200).send(member);
          } else {
            return res.status(401).send("Current Password is Incorrect");
          }
        } else if (request === "edit_user") {
          let image = member.image;
          if (req.file) {
            image = req.file.filename;
          }
          const updatedMember = await User.findOneAndUpdate(
            { username: req.params.username },
            {
              $set: {
                fullname,
                phone_number,
                address,
                birthday,
                image
              }
            },
            { new: true }
          );
          return res.status(200).send(updatedMember);
        } else if (request === "cart") {
          let index = member.cart.findIndex(
            cur => cur.product._id == productId
          );
          if (target === "decreaseQuantity") {
            if (member.cart[index].quantity === 1) {
              member.cart.splice(index, 1);
              let newMember = await member.save();
              return res.status(200).send(newMember);
            } else {
              member.cart[index].quantity--;
              let newMember = await member.save();
              return res.status(200).send(newMember);
            }
          }
          if (index !== -1) {
            if (
              member.cart[index].quantity < member.cart[index].product.amount
            ) {
              member.cart[index].quantity++;
              let newMember = await member.save();
              return res.status(200).send(newMember);
            }
          } else {
            member.cart.push({ product, quantity: 1 });
            let newMember = await member.save();
            return res.status(200).send(newMember);
          }
        } else if (request === "delete_notification") {
          member.notifications = member.notifications.filter(
            cur => cur._id != noti_id
          );
          await member.save();
          return res.status(200).send(member);
        }
        return res.status(500).send("Something went wrong");
      } catch (err) {
        console.log(err);
        return res.status(500).send("Something went wrong");
        console.log(err);
      }
    }
  );

  app.delete(
    "/members/:username",
    requireLogin,
    requireAdmin,
    async (req, res) => {
      const url = "/../client/public/uploads/members/";
      const dir = path.join(`${__dirname}${url}${req.params.username}`);
      try {
        if (fs.existsSync(dir)) {
          fs.readdirSync(dir).forEach(file => {
            fs.unlinkSync(`${__dirname}${url}${req.params.username}/${file}`);
          });
          fs.rmdir(dir, err => {
            if (err) {
              new Error(err);
            } else {
              console.log("Everything went well");
            }
          });
        }
        await User.findOneAndRemove({
          username: req.params.username
        });
        res.status(200).send("User Deleted!");
      } catch (err) {
        console.log(err);
        res.status(500).send(err);
      }
    }
  );
};
