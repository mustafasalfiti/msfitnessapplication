const {Schema} = require('mongoose');

module.exports = new Schema({
    product: {
        type:Schema.Types.ObjectId ,
        ref: "Product"
    } ,
    quantity:Number ,
    createdDate: {
        type:Date,
        default:Date.now ,
    } ,
    status:{
        type:String ,
        default:"Pending"
    }
})