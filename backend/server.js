require("dotenv").config()
const { default: mongoose } = require("mongoose")
const app = require("./src/app")
const connectDB = require("./src/config/db")
require("colors")

const PORT = process.env.PORT || 3000

async function start(){
    try{
        await connectDB()
        const server = app.listen(PORT , () => {
            console.log(`Sever is running at http://localhost:${PORT}`.yellow)
        })

        //Shutdown
        process.on('SIGINT', async() => {
            console.log("Shutting Down".red)
            await mongoose.disconnect()
            server.close(() => process.exit(0))
        })
    }
    catch(error){
        console.log("Failed to start server".red)
        process.exit(1)
    }
}

start()