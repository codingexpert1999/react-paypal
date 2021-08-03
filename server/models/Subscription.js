const mongoose = require("mongoose")

const subscriptionSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    billingToken: {
        type: String,
        required: true
    },
    orderID: {
        type: String,
        required: true
    }
}, {timestamps: true, _id: false})

const Subscription = mongoose.model("subscription", subscriptionSchema);

module.exports = Subscription;