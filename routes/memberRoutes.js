const User = require("../models/User");
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
  app.get("/api/members", requireLogin, requireAdmin, async (req, res) => {
    try {
      const members = await User.filterMembers();
      res.status(200).send(members);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  app.get("/api/members/:username", requireLogin, requireAdmin, async (req, res) => {
    try {
      const member = await User.findOne({ username: req.params.username });
      res.status(200).send(member);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  app.post(
    "/api/members",
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
    "/api/members/:username",
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

  app.delete(
    "/api/members/:username",
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
