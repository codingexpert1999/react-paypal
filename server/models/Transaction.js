const mongoose = require("mongoose")

const transactionSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    orderID: {
        type: String,
        required: true
    },
    payerID: {
        type: String,
        required: true
    },
    status: String,
    description: String,
    amount: {
        currency_code: String,
        value: String,
        breakdown: {
            handling: String,
            insurance: String,
            item_total: String,
            shipping: String,
            shipping_discount: String
        }
    },
    items: [
        {
            name: String,
            quantity: String,
            unit_amount: String
        }
    ]
}, {timestamps: true, _id: false})

const Transaction = mongoose.model('transaction', transactionSchema)

module.exports = Transaction