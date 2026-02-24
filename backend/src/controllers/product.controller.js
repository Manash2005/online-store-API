const productModel = require("../models/product.model")
const mongoose = require("mongoose")

async function getAllProducts(req,res,next){
    try{

        //array of products
        const products = await productModel.find()
        
        //return res
        return res.status(200).json({
            message : "fetched all products",
            success : "true",
            products
        })
    }
    catch(error){
        console.log(error)
        return res.status(401).json({
            message : "Error while fetching products",
            success : "false"
        })
    }
}

async function createProduct(req,res,next){
    try{

        //collect data
        const {title,description,price,seller} = req.body
        
        //create product
        const product = await productModel.create({
            title,
            description,
            price,
            seller
        })
        
        //return res
        return res.status(201).json({
            message : "New product created",
            success : "true",
            product
        })
    }catch(error){
        console.log(error)
        return res.status(401).json({
            message : "Error while creating product",
            success : "false",
        })
    }
}

async function getProduct(req,res,next){
     try{

        const {id} = req.params

         // Validate MongoDB ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: "Invalid product ID"
        });
        }

        const product = await productModel.findById(id)
        if(!product){
            return res.status(404).json({
                message : "Product not found",
            })
        }

        
        //return res
        return res.status(200).json({
            message : "fetched product",
            success : "true",
            product
        })
    }
    catch(error){
        console.log(error)
        return res.status(401).json({
            message : "Error while fetching product",
            success : "false"
        })
    }
}

async function updateProduct(req, res) {
    try {
        const { id } = req.params;
        const { title, description, price } = req.body;

        // Validate ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid product ID"
            });
        }

        // 2Update product
        const product = await productModel.findByIdAndUpdate(
            id,
            { title, description, price },
            { new: true, runValidators: true }
        );

        // Check if product exists
        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({
            message: "Product updated successfully",
            success: true,
            product
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error occurred while updating product",
            success: false
        });
    }
}

module.exports = {createProduct,getProduct,getAllProducts,updateProduct}