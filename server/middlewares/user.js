const User = require("../models/User")
const {verify} = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const jwtSecret = process.env.JWT_SECRET

exports.userById = async (req, res, next, id) => {
    try {
        const user = await User.findById(id);

        if(!user){
            return res.status(404).json({error: 'User not found'})
        }

        req.user = user;

        req.user.password = undefined;

        next()
    } catch (err) {
        console.log(err)
        res.status(500).json({error: err.message})
    }
}

exports.requireLogin = (req, res, next) => {
    try {
        const auth = req.headers.authorization.split(" ")[1]

        if(!auth){
            return res.status(401).json({error: "User not authorized"})
        }

        verify(auth, jwtSecret, (err, payload) => {
            if(err) throw err;

            req.userPayload = payload;

            next()
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({error: err.message})
    }
}

exports.isAuthorized = (req, res, next) => {
    if(
        req.user._id.toString() === req.userPayload.id && 
        req.user.firstName === req.userPayload.firstName && 
        req.user.lastname === req.userPayload.lastname && 
        req.user.email === req.userPayload.email
    ){
        next()
    }else{
        return res.status(401).json({error: "User not authorized. False credentials"})
    }
}