const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const userModel = require("../models/user.model")

async function registerUser(req, res){

    try{

        //Collect data 
        const {name, email, password, role='user'} = req.body
        
        //check if user already exist
        const userExists = await userModel.findOne({email})
        
        if(userExists){
            return res.status(400).json({
                message : "User already exists",
                success : "false"
            })
        }
        
        //Hash password
        const hashPassword = await bcrypt.hash(password, 10)
        
        //create user
        const newUser = await userModel.create({
            name,
            email,
            password : hashPassword,
            role
        })
        
        //generate a token
        const token = jwt.sign({
            id : newUser._id,
            role : newUser.role
        }, process.env.JWT_SECRET, {expiresIn : "7d"})
        
        //return response
        res.cookie("token", token)
        return res.status(201).json({
            message : "User created successfully",
            newUser
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            message : "Error while registering user",
            success : "false"
        })
    }


}

module.exports = {registerUser}