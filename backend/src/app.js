const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const authRoutes = require("./routes/auth.route")
const productRoutes = require("./routes/product.route")

const app = express()

//Built-in Middlewares
app.use(express.json()) 
app.use(cors())
app.use(morgan("dev"))

app.get('/api/', (req, res) => {
    res.status(200).json({
        title : "Welcome to my shop",
        description : "We serve for you not for us"
    })
})
app.use('/api', authRoutes)
app.use('/product', productRoutes)



app.use((req,res,next) => {

    console.log("Page not Found".red)

    res.status(404).json({
        message : "Page Not Found"
    })
})

app.use((err, req, res, next) => {
  console.error(err)
  res.status(err.status || 500).json({ message: err.message || "Server Error" })
})


module.exports = app