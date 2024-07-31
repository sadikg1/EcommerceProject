const JWT = require("jsonwebtoken")

const UserModel = require("../models/User.Model.js");

const requireSignin = (req, res, next) => {
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET)
        req.user=decode
        next();
    }
    
    catch (err) {
        console.log(err)
        res.send()
    }
}

const isAdmin = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.user._id)
        if (user.role != 1) {
            return res.status(401).send({
                success: false,
                message: "Unauthorized access!"
            })
    
        }
        else {
            next()
        }
    }
    catch (err) {
        console.log("error", err)
        res.status(500).send({
            success: "False",
            message: "Error in admin middleware",
            err
        })
    }
    
}
module.exports = { requireSignin, isAdmin }