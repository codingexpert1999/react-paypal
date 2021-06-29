const {validationResult} = require("express-validator")
const Transaction = require('../models/Transaction')

exports.get = async (req, res) => {
    try {
        const transactions = await Transaction.find({user: req.user.id});

        res.json(transactions)
    } catch (err) {
        console.log(err)
        res.status(500).json({error: err.message})
    }
}

exports.create = async (req, res) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        const {transactionDetails} = req.body;

        let transactionObj = {
            orderID: transactionDetails.id,
            payerID: transactionDetails.payer.payer_id,
            status: transactionDetails.status,
            description: transactionDetails.purchase_units[0].description,
            amount: {
                currency_code: transactionDetails.purchase_units[0].amount.currency_code,
                value: transactionDetails.purchase_units[0].amount.value,
                breakdown: {
                    handling: transactionDetails.purchase_units[0].amount.breakdown.handling.value,
                    insurance: transactionDetails.purchase_units[0].amount.breakdown.insurance.value,
                    item_total: transactionDetails.purchase_units[0].amount.breakdown.item_total.value,
                    shipping: transactionDetails.purchase_units[0].amount.breakdown.shipping.value,
                    shipping_discount: transactionDetails.purchase_units[0].amount.breakdown.shipping_discount.value
                }
            },
            items: transactionDetails.purchase_units[0].items.map(item => {
                let itemObj = {
                    name: item.name,
                    quantity: item.quantity,
                    unit_amount: item.unit_amount.value
                }

                return itemObj;
            }),
            _id: transactionDetails.purchase_units[0].payments.captures[0].id
        }

        transactionObj.user = req.user._id
        
        const transaction = await Transaction.create(transactionObj)

        res.json(transaction)
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message})
    }
}