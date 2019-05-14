const User = require("../models/User");
const Product = require("../models/Product");
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
    if(username.length < 5) {
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
  app.get("/auth/members", requireLogin, requireAdmin, async (req, res) => {
    try {
      const members = await User.filterMembers();
      res.status(200).send(members);
    } catch (err) {
      res.status(400).send(err);
    }
  });

  app.get("/auth/members/:username", requireLogin, async (req, res) => {
    try {
      const member = await User.findOne(
        { username: req.params.username },
        "-password"
      );
      res.status(200).json(member);
    } catch (err) {
      res.status(400).send(err);
    }
  });

  app.post(
    "/auth/members",
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
        res.status(400).json({ ...err, message: err.message });
      }
    }
  );

  app.post("/auth/login", async (req, res) => {
    try {
      let { username, password } = req.body;
      username = username.toLowerCase();
      const user = await User.findOne({ username });
      const isTrue = user.auth.comparePassword(password);
      const token = user.auth.generateAuthToken();

      if (isTrue && user.type === "admin") {
        return res
          .cookie("alpha-access", token, {
            maxAge: 1000 * 60 * 60 * 24 * 15,
            signed: true,
            httpOnly: true // that means we cannot get this cookie from document.cookie
          })
          .send(user);
      } else if (isTrue && user.type === "member") {
        return res
          .cookie("omega-access", token, {
            maxAge: 1000 * 60 * 60 * 24 * 15,
            signed: true,
            httpOnly: true // that means we cannot get this cookie from document.cookie
          })
          .send(user);
      } else {
        throw Error("Something is Wrong with the user type");
      }
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  });

  app.put(
    "/auth/members/:username",
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
        const member = await User.findOneAndUpdate(
          { username: req.params.username },
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(member);
      } catch (err) {
        res.status(400).send(err);
      }
    }
  );

  app.put(
    "/members/:username",
    requireLogin,
    upload.single("image_file"),
    async (req, res) => {
      const { productId , request ,  password, currentPassword } = req.body;
      try {
        const member = await User.findOne({ username: req.params.username }).populate('cart');
        const product = await Product.findOne({_id:productId});
        if (password) {
          const isTrue = member.auth.comparePassword(currentPassword);
          if (isTrue) {
            member.password = member.auth.generateSalts(password);
            await member.save();
            return res.status(200).send(member);
          } else {
            return res.status(401).send("Current Password is Incorrect");
          }
        } else if (req.file) {
          member.image = req.file.filename;
          await member.save();
          res.status(200).send(member);
        } else if(request === 'cart'){
          if(member.cart.id == productId) {
            console.log('hello');
          } else {
            member.cart.push({...product , amount:1})
            await member.save();
          return  console.log(member);
          }
        }
        return res.status(400).send("Something went wrong");

      } catch (err) {
        console.log(err);
        return res.status(400).send("Something went wrong");
      }
    }
  );

  app.delete(
    "/auth/members/:username",
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
        res.status(400).send(err);
      }
    }
  );

  app.get("/auth/logout", requireLogin, (req, res) => {
    req.user.token = undefined;
    req.user.save();
    if (req.user.type === "admin") {
      return res
        .clearCookie("alpha-access")
        .status(200)
        .send("User Loggout Successfully");
    } else {
      return res
        .clearCookie("omega-access")
        .status(200)
        .send("User Loggout Successfully");
    }
  });

  app.get("/auth/me", requireLogin, (req, res) => {
    res.status(200).json(req.user);
  });
};
