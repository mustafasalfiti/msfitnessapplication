const Nexmo = require("nexmo");
const keys = require("../config/keys");
const User = require("../models/User");

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
        const text = `Hello ${user.fullname} You requested to restart your password here is your code: ${code}`
        const phoneNumber = user.phone_number.replace('0' , '49');
        const response = await nexmo.message.sendSms('MSfitness' , phoneNumber , text , (err , responseData)=> {
          if(err) {
            console.log(err);
          } else {
            if(responseData.messages[0]['status'] === '0') {
              console.log('Message Sent Successfully')
            } else {
              console.log(`Message Failed with error ${responseData.messages[0]['error-text']}`)
            }
          }
        }) 
        console.log(response);
      } else {
        return res.status("401").send("User is not found");
      }
    } catch (err) {
      res.status(400).send(err);
      console.log(err);
    }
  });
};
