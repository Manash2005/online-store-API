const mongoose = require("mongoose")
require("colors")

async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database connected successfully ✅".green)
    }
    catch(error){
        console.log("Database connection error ❌".red)
        console.log(error);
        throw error;
    }
}

module.exports = connectDB