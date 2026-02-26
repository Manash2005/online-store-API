const mongoose = require("mongoose")

const productShema = new mongoose.Schema({
    productImage : {
        type : String,
        required : true,
    },
    title : {
        type : String,
        required : true,
        trim : true,
        minlength : 1
    },
    description : {
        type : String,
        required : true,
        trim : true,
    },
    price : {
        type : Number,
        required : true,
        min : 0
    },
    seller : {
        type : mongoose.Types.ObjectId,
        ref : "user",
        required : true,
    }
}, {timestamps : true})

const productModel = mongoose.model("products", productShema)

module.exports = productModel