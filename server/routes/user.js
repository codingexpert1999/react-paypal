const {Router} = require("express")
const {register, login} = require("../controllers/user")
const {check} = require("express-validator")

const router = Router()

router.post("/user/register", [
    check("firstName", "First name is required").notEmpty(),
    check("lastName", "Last name is required").notEmpty(),
    check("email", "Email is required").notEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Password is required").notEmpty()
], register)

router.post("/user/login", [
    check("email", "Email is required").notEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Password is required").notEmpty()
], login)

module.exports = router;
