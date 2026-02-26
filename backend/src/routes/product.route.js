const prodcutController = require("../controllers/product.controller")
const upload = require("../middlewares/upload")
const router = require("express").Router()


router.post("/create-product", upload.single("productImage"), prodcutController.createProduct)
router.get("/getproducts", prodcutController.getAllProducts)
router.get("/getproducts/:id", prodcutController.getProduct)
router.patch("/update-product/:id", prodcutController.updateProduct)


module.exports = router

