import React, { useEffect, useState } from 'react'
import Moment from 'react-moment'
import TransactionItem from './TransactionItem'
import {useDispatch, useSelector} from 'react-redux'
import { getFullRefund } from '../../../actions/transaction'

const Transaction = ({transaction}) => {
    const dispatch = useDispatch();
    
    const {token, user} = useSelector(state => state.user)
    const {loading} = useSelector(state => state.transaction);

    const handleRefund = () => {
        const amount = {
            currency: transaction.amount.currency_code,
            total: transaction.amount.value
        }

        dispatch(getFullRefund(user._id, token, transaction._id, amount))
    }

    return (
        <li className="list-item">
            <div className="list-item-group">
                <label>Transaction ID:</label>
                <span>{transaction._id}</span>
            </div>

            <div className="list-item-group">
                <label>Order ID:</label>
                <span>{transaction.orderID}</span>
            </div>

            <div className="list-item-group">
                <label>Payer ID:</label>
                <span>{transaction.payerID}</span>
            </div>

            <div className="list-item-group">
                <label>Status:</label>
                <span>{transaction.status}</span>
            </div>

            <div className="list-item-group">
                <label>Description:</label>
                <span>{transaction.description}</span>
            </div>

            <div className="list-item-group">
                <label>Created At:</label>
                <span>
                    <Moment format="DD/MM/YYYY hh:mm:ss">{transaction.createdAt}</Moment>
                </span>
            </div>

            <div className="nested-list">
                <h4>Amount</h4>
                
                <ul>
                    <li>
                        <label>Currency Code:</label>
                        <span>{transaction.amount.currency_code}</span>
                    </li>

                    <li>
                        <label>Total Amount:</label>
                        <span>{transaction.amount.value}$</span>
                    </li>
                </ul>
            </div>

            <h4>Items</h4>

            <div className="nested-list">
                {transaction.items.map((item, i) => (
                    <TransactionItem key={Date.now() + Math.random() + ""} item={item} index={i}/>
                ))}
            </div>

            <button onClick={handleRefund} className={loading ? 'disabled' : ''} disabled={loading}>Refund</button>
        </li>
    )
}

export default Transaction
