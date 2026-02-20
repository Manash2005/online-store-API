require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./src/app");
const connectDB = require("./src/config/db");
require("colors");

const PORT = process.env.PORT || 3000;

let server;

async function start() {
    try {
        await connectDB();

        server = app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`.yellow);
        });

    } catch (error) {
        console.log("Failed to start server".red);
        process.exit(1);
    }
}

const shutdown = async () => {
    console.log("\nGracefully shutting down...".red);

    await mongoose.connection.close(false);

    server.close(() => {
        console.log("Server closed".yellow);
        process.exit(0);
    });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

start();
