const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const mongoURI = process.env.MONGO_URI

const connectToDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex: true
        })

        console.log("Connected to Database...")
    } catch (err) {
        process.exit(1);
        console.log(err)
    }
}

module.exports = connectToDB