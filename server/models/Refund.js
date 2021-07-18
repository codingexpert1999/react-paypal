const mongoose = require("mongoose")

const refundSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    capture_id: {
        type: String,
        required: true
    },
    refund_from_received_amount: String,
    refund_from_transaction_fee: String,
    total_refunded_amount: String
}, {timestamps: true, _id: false})

const Refund = mongoose.model('refund', refundSchema)


module.exports = Refund;