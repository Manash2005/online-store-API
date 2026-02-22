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

async function loginUser(req,res){
    try{
        //collect data
        const {email, password} = req.body

        //check if user exits
        const userExists = await userModel.findOne({email})

        if(!userExists){
            return res.status(401).json({
                message : "Invalid credentials",
                success : "false"
            })
        }

        //check if password is correct
        const isPasswordCorrect = await bcrypt.compare(password, userExists.password)

        if(!isPasswordCorrect){
            return res.status(401).json({
                message : "Invalid credentials",
                success : "true"
            })
        }


        //generate token
        const token = jwt.sign({
            id : userExists._id,
            role : userExists.role
        }, process.env.JWT_SECRET, {expiresIn : "7d"})

        //send success response
        res.cookie("token", token)
        res.status(200).json({
            message : "User logged in successfully",
            success : "true"
        })
    }
    catch(error){
        res.status(401).json({
            message : "Error while logging in",
            success : "false"
        })
    }
}

module.exports = {registerUser, loginUser}