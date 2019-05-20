const User = require("../models/User");
const { requireLogin } = require("../middlewares/auth");

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

  app.get("/auth/me", requireLogin, (req, res) => {
    res.status(200).json(req.user);
  });
};
