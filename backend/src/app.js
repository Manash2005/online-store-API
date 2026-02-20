const express = require("express")
const cors = require("cors")

const app = express()

//Built-in Middlewares
app.use(express.json()) 
app.use(cors())


module.exports = app