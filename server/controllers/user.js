const User = require("../models/User")
const {validationResult} = require("express-validator")
const {sign} = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const jwtSecret = process.env.JWT_SECRET

exports.register = async (req, res) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        const {firstName, lastName, email, password} = req.body;

        const user = await User.create({firstName, lastName, email, password})

        const payload = {
            id: user.id, firstName, lastName, email
        }

        sign(payload, jwtSecret, (err, token) => {
            if(err) throw err;

            user.password = undefined

            res.json({user, token})
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({error: err.message})
    }
}

exports.login = async (req, res) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        const {email, password} = req.body;

        const user = await User.findOne({email})

        if(!user){
            return res.status(404).json({error: "User not found."})
        }

        if(user.password !== password){
            return res.status(401).json({error: "False credentials."})
        }

        const payload = {
            id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email
        }

        sign(payload, jwtSecret, (err, token) => {
            if(err) throw err;

            res.json({user, token})
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({error: err.message})
    }
}