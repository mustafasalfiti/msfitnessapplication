const Nexmo = require("nexmo");
const keys = require("../config/keys");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const nexmo = new Nexmo({
  apiKey: keys.nexmoAPIKey,
  apiSecret: keys.nexmoSecretKey
});

module.exports = app => {
  app.post("/forgetpassword", async (req, res) => {
    const { phone_number } = req.body;
    try {
      const user = await User.findOne({ phone_number });
      if (user) {
        const code = Math.floor(100000 + Math.random() * 900000);
        const text = `Hello ${
          user.fullname
        } \n You requested to restart your password \n here is your code: ${code} \n code will expire in 5 min`;
        const phoneNumber = user.phone_number.replace("0", "49");
        user.handleResetPassword.saveCode(code);
        nexmo.message.sendSms(
          "MSfitness",
          phoneNumber,
          text,
          (err, responseData) => {
            if (err) {
              console.log(err);
            } else {
              if (responseData.messages[0]["status"] === "0") {
                user.handleResetPassword.saveCode(code);
                res.status(200).send("Message Sent Successfully");
              } else {
                console.log(
                  `Message Failed with error ${
                    responseData.messages[0]["error-text"]
                  }`
                );
              }
            }
          }
        );
      } else {
        return res.status("401").send("Phone Number Doesn't exists");
      }
    } catch (err) {
      res.status(400).send(`Message error : ${err}`);
      console.log(err);
    }
  });

  app.post("/resetpassword", async (req, res) => {
    const { code, phone_number } = req.body;
    try {
      const user = await User.findOne({ phone_number }).populate(
        "resetPassword"
      );
      if (user.resetPassword.code === code) {
        let token = jwt
          .sign(
            { phone_number: user.phone_number, _id: user.resetPassword._id },
            "resetpassword"
          )
          .toString();
        user.handleResetPassword.saveToken(token);
        console.log(token);
        return res.status(200).send(token);
      } else {
        let times = await user.handleResetPassword.timesRequested();
        if (times < 3) {
          return res
            .status(400)
            .send(
              `You have tried to enter the code ${times} times please contact us in order to reset your password`
            );
        } else if (times === 3) {
          user.resetPassword = undefined;
          user.save();
          return res
            .status(400)
            .send(
              `You have tried 3 times please contact us or reset password again`
            );
        }
      }
    } catch (err) {
      console.log(err);
      res.status(400).send(`Message error : ${err}`);
    }
  });

  app.post("/resetpassword/:token", async (req, res) => {
    const { password } = req.body;
    let { phone_number, _id } = jwt.verify(req.params.token, "resetpassword");
    try {
      let user = await User.findOne({ phone_number });
      if (user.resetPassword == _id) {
        user.password = user.auth.generateSalts(password);
        user.resetPassword = undefined;
        await user.save();
        res.status(200).send("Password Changed Successfully");
      } else {
        res.status(400).send("Something went wrong");
      }
    } catch (err) {
      res.status(400).send("Something went wrong");
    }
  });
};
