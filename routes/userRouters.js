const User = require("../models/User");
const { requireLogin, requireAdmin } = require("../middlewares/auth");

module.exports = app => {
  app.get("/auth/members", requireLogin, requireAdmin, async (req, res) => {
    try {
      const members = await User.find({ type: "member" }, "-password");
      res.status(200).json(members);
    } catch (err) {
      res.status(400).send("Something went wrong");
      console.log(err);
    }
  });

  app.post("/auth/members", requireLogin, requireAdmin, async (req, res) => {
    let { username } = req.body;
    username = req.body.username.toLowerCase();
    try {
      const user = await new User({
        ...req.body,
        username
      });
      user.password = user.auth.generateSalts(user.password);
      await user.save();
      res.status(200).send("User Successfully Created");
    } catch (err) {
      res.status(400).send("Something went wrong");
      console.log(err);
    }
  });

  app.post("/auth/admins", async (req, res) => {
    let { username } = req.body;
    username = req.body.username.toLowerCase();
    try {
      const user = await new User({
        ...req.body,
        username,
        type: "admin"
      });
      user.password = user.auth.generateSalts(user.password);
      console.log();
      await user.save();
      res.status(200).send("User Successfully Created");
    } catch (err) {
      res.status(400).send({...err});
    }
  });

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
      res.status(400).send("Something went wrong");
      console.log(err);
    }
  });

  app.get("/auth/me", requireLogin, (req, res) => {
    res.status(200).json(req.user);
  });
};
