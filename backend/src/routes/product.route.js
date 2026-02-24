const prodcutController = require("../controllers/product.controller")
const { route } = require("./auth.route")
const router = require("express").Router()

router.post("/create-product", prodcutController.createProduct)
router.get("/getproducts", prodcutController.getAllProducts)
router.get("/getproducts/:id", prodcutController.getProduct)
router.patch("/update-product/:id", prodcutController.updateProduct)


module.exports = router

