const express = require('express');
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const morgan = require('morgan');

mongoose.connect("mongodb://127.0.0.1:27017/MSfitness" , {useNewUrlParser:true , useFindAndModify: false , useCreateIndex:true});

const app = express();
app.use(bodyParser.json());
app.use(cookieParser("key12345"));
app.use(morgan('dev'));

require("./routes/userRoutes")(app);
require("./routes/memberRoutes")(app);
require("./routes/productRoutes")(app);
require("./routes/paymentRoutes")(app);
require("./routes/forgetPasswordRoutes")(app);




const PORT = 5000;
app.listen(PORT , ()=> {
  console.log(`Server open in port ${PORT}`)
})