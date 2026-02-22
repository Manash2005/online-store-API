const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        
    },

    email : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        lowercase : true
    },

    password : {
        type : String,
        trim : true,
        required : true
    },

    role : {
        type : String,
        enum : ["user", "seller", "admin"],
        required : true,
        default : "user"
    }
},{timestamps : true})

const userModel = mongoose.model("user", userSchema);

module.exports = userModel