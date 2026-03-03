const userModel = require("../models/user.model")

async function getUser(req, res) {
    try {
        const id = req.user.id
        const user = await userModel.findById(id)
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: "false"
            })
        }
        return res.status(200).json({
            message: "User fetched successfully",
            success: "true",
            user
        })
    }
    catch (error) {
        console.log(error)
        return res.status(401).json({
            message: "Error while fetching user",
            success: "false"
        })
    }
}

module.exports = { getUser }