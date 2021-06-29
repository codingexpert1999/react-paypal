const express = require('express')
const cors = require("cors")
const connectToDB = require('./config/db')

const userRoutes = require("./routes/user")
const transactionRoutes = require("./routes/transaction")

const app = express()

connectToDB()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/api", userRoutes)
app.use("/api", transactionRoutes)

app.listen(5000, () => console.log('Server started on port 5000'))