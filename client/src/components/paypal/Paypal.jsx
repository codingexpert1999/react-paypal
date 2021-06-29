import React from 'react'
import {PayPalScriptProvider, PayPalButtons} from '@paypal/react-paypal-js'
import { toast } from 'react-toastify'
import {useDispatch, useSelector} from 'react-redux'
import {saveTransaction} from '../../actions/transaction'

const Paypal = () => {
    const dispatch = useDispatch()

    const {user, token} = useSelector(state => state.user)
    
    return (
        <PayPalScriptProvider options={
            {
                "client-id": process.env.REACT_APP_CLIENT_ID, 
                intent: "capture", 
                currency: 'USD'
            }
        }>
            <PayPalButtons
                createOrder={(data, actions) => 
                    actions.order.create({
                        application_context: {
                            user_action: "PAY_NOW",
                            brand_name: "JUST A STORE",
                            landing_page: "LOGIN",
                            shipping_preference: "GET_FROM_FILE",
                        },
                        purchase_units: [{
                            description: "test description",
                            items: [{name: 'test name 1', quantity: 1, unit_amount: {value: 10, currency_code: 'USD'}}],
                            amount: {
                            value: 10,
                            breakdown: {item_total: {value: 10, currency_code: 'USD'}}
                            },
                            shipping: {
                            address: {
                                address_line_1: "test address 1",
                                admin_area_1: 'test address 1',
                                address_line_2: "test address 1",
                                admin_area_2: 'test address 1',
                                postal_code: '58500',
                                country_code: 'US'
                            }
                            }
                        }]
                    })
                }
                onApprove={(data, actions) => {
                    return actions
                    .order
                    .capture()
                    .then(
                        (details) => dispatch(saveTransaction(user._id, token, details))
                    );
                }}
                onCancel={(data) => {
                    console.log("Payment cancelled")
                }}
                onError={(err) => {
                    toast.error(err)
                }}
            />
        </PayPalScriptProvider>
    )
}

export default Paypal
