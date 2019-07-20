const User = require("../models/User");
const { requireLogin } = require("../middlewares/auth");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const Product = require('../models/Product');


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
      res.status(500).send(err);
    }
  });

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

  app.post('/auth' , async(req , res)=> {
   let user =  await new User(req.body)
    user.password = user.auth.generateSalts(req.body.password);
    await user.save();
    res.status(200).send('Registered');
  })

  app.put(
    "/auth/edit",
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
        const user = await User.findOne({
          username: req.user.username
        }).populate({
          path: "cart.product",
          populate: {
            path: "product"
          }
        });
        const product = await Product.findOne({ _id: productId });
        if (password) {
          const isTrue = user.auth.comparePassword(currentPassword);
          if (isTrue) {
            user.password = user.auth.generateSalts(password);
            await user.save();
            return res.status(200).send(user);
          } else {
            return res.status(401).send("Current Password is Incorrect");
          }
        } else if (request === "edit_user") {
          let image = user.image;
          if (req.file) {
            image = req.file.filename;
          }
          const newUser = await User.findOneAndUpdate(
            { username: req.user.username },
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
          return res.status(200).send(newUser);
        } else if (request === "cart") {
          let index = user.cart.findIndex(
            cur => cur.product._id == productId
          );
          if (target === "decreaseQuantity") {
            if (user.cart[index].quantity === 1) {
              user.cart.splice(index, 1);
              let newMember = await user.save();
              return res.status(200).send(newMember);
            } else {
              user.cart[index].quantity--;
              let newMember = await user.save();
              return res.status(200).send(newMember);
            }
          }
          if (index !== -1) {
            if (
              user.cart[index].quantity < user.cart[index].product.amount
            ) {
              user.cart[index].quantity++;
              let newMember = await user.save();
              return res.status(200).send(newMember);
            }
          } else {
            user.cart.push({ product, quantity: 1 });
            let newMember = await user.save();
            return res.status(200).send(newMember);
          }
        } else if (request === "delete_notification") {
          user.notifications = user.notifications.filter(
            cur => cur._id != noti_id
          );
          await user.save();
          return res.status(200).send(user);
        }
        return res.status(500).send("Something went wrong");
      } catch (err) {
        console.log(err);
  
        return res.status(500).send("Something went wrong");
      }
    }
  );

  app.get("/auth/me", requireLogin, (req, res) => {
    res.status(200).json(req.user);
  });
};
