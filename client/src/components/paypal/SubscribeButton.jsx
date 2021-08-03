import React from 'react'
import {PayPalScriptProvider, PayPalButtons} from '@paypal/react-paypal-js'
import {useDispatch, useSelector} from 'react-redux'
import { subscribe } from '../../actions/transaction';

const SubscriptionButton = () => {
    const dispatch = useDispatch();

    const {user, token} = useSelector(state => state.user)

    return (
        <PayPalScriptProvider options={{
            "client-id": process.env.REACT_APP_CLIENT_ID,
            intent: "subscription",
            vault: true,
            currency: "USD"
        }}>
            <PayPalButtons
                createSubscription={(data, actions) => {
                    return actions.subscription.create({
                        'plan_id': 'P-6NM40154YW9895300MDFGFGY'
                    });
                }}
                
                onApprove={(data, actions) => {
                    dispatch((subscribe(user._id, token, data)))
                }}
            />
        </PayPalScriptProvider>
    )
}

export default SubscriptionButton
