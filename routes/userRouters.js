const User = require("../models/User");
const { requireLogin, requireAdmin } = require("../middlewares/auth");

module.exports = app => {
  app.get("/auth/members", requireLogin, requireAdmin, async (req, res) => {
    try {
      const members = await User.find({ type: "member" }, "-password");
      res.status(200).json(members);
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
      res.status(200).json(user);
    } catch (err) {
      res.status(400).json({ ...err, message: err.message });
    }
  });

  app.post("/auth/members", async (req, res) => {
    try {
      let { username, password } = req.body;
      username = username.toLowerCase();
      const user = await User.findOne({ username: req.params.username });
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
      res.status(400).send(err);
    }
  });

  app.put(
    "/auth/members/:username",
    requireLogin,
    requireAdmin,
    async (req, res) => {
      console.log(req.body)
      if (req.body.type) {
        req.body.type = undefined;
      }
      try {
        const member = await User.findOneAndUpdate(
          { username: req.params.username },
          { $set: req.body },
          { new: true }
        );
        console.log(member);
        res.status(200).json(member);
      } catch (err) {
        res.status(400).send(err);
      }
    }
  );

  app.put("/members/:username", requireLogin, async (req, res) => {
    const { password } = req.body;
    try {
      const member = await User.findOneAndUpdate(
        { username: req.params.username },
        { $set: { password } },
        { $new: true }
      );
      res.status(200).json(member);
    } catch (err) {
      res.status(400).send(err);
    }
  });

  app.delete(
    "/auth/members/:username",
    requireLogin,
    requireAdmin,
    async (req, res) => {
      try {
        await User.findOneAndRemove({ username: req.params.username });
        res.status(200).send("User Deleted!");
      } catch (err) {
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
