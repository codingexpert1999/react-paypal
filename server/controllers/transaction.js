const {validationResult} = require("express-validator")
const Transaction = require('../models/Transaction')
const Refund = require('../models/Refund')
const Subscription = require('../models/Subscription')
const axios = require('axios')
const dotenv = require('dotenv')

dotenv.config()

const username = process.env.CLIENT_ID;
const password = process.env.CLIENT_SECRET;

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

exports.getFullRefund = async (req, res) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        const transactionId = req.params.transactionId;

        const {amount} = req.body;

        const {data: {access_token}} = await axios({
            url: "https://api.sandbox.paypal.com/v1/oauth2/token",
            method: "post",
            headers: {
                Accept: "application/json",
                'Accept-Language': "en_US",
                'Content-Type': "application/x-www-form-urlencoded"
            },
            auth: {
                username,
                password
            },
            params: {
                grant_type: "client_credentials"
            }
        })

        const config = {
            headers: {
                'Content-Type': "application/json",
                Authorization: `Bearer ${access_token}`
            }
        }

        const body = JSON.stringify({amount});

        await Transaction.findByIdAndDelete(transactionId);

        const {
            data: {
                id,
                capture_id,
                refund_from_received_amount,
                refund_from_transaction_fee,
                total_refunded_amount
            }
        } = 
        await axios.post(`https://api-m.sandbox.paypal.com/v1/payments/capture/${transactionId}/refund`, body, config)

        const refund = await Refund({
            _id: id,
            capture_id,
            user: req.user._id,
            refund_from_received_amount: refund_from_received_amount.amount,
            refund_from_transaction_fee: refund_from_transaction_fee.amount,
            total_refunded_amount: total_refunded_amount.amount
        })

        res.json(refund)
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message})
    }
}

exports.getMyRefunds = async (req, res) => {
    try {
        const refunds = await Refund.find({user: req.user.id});

        res.json(refunds)
    } catch (err) {
        console.log(err)
        res.status(500).json({error: err.message})
    }
}

exports.subscribe = async (req, res) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        const {subscriptionDetails} = req.body;

        const {subscriptionID, billingToken, orderID} = subscriptionDetails;

        const subscription = await Subscription.create({
            _id: subscriptionID,
            billingToken,
            orderID,
            user: req.user._id
        })

        res.json(subscription)
    } catch (err) {
        console.log(err)
        res.status(500).json({error: err.message})
    }
}

exports.unsubscribe = async (req, res) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        const {reason} = req.body;

        const subscriptionId = req.params.subscriptionId;

        const {data: {access_token}} = await axios({
            url: "https://api.sandbox.paypal.com/v1/oauth2/token",
            method: "post",
            headers: {
                Accept: "application/json",
                'Accept-Language': "en_US",
                'Content-Type': "application/x-www-form-urlencoded"
            },
            auth: {
                username,
                password
            },
            params: {
                grant_type: "client_credentials"
            }
        })

        const config = {
            headers: {
                'Content-Type': "application/json",
                Authorization: `Bearer ${access_token}`
            }
        }

        const body = JSON.stringify({reason})

        await axios.post(`https://api-m.sandbox.paypal.com/v1/billing/subscriptions/${subscriptionId}/cancel`, body, config)

        await Subscription.findByIdAndDelete(subscriptionId);

        res.json({message: `The subscription with ID ${subscriptionId} cancelled successfully!`})
    } catch (err) {
        console.log(err)
        res.status(500).json({error: err.message})
    }
}

exports.getMySubscriptions = async (req, res) => {
    try {
        const subscriptions = await Subscription.find({user: req.user.id});

        res.json(subscriptions)
    } catch (err) {
        console.log(err)
        res.status(500).json({error: err.message})
    }
}