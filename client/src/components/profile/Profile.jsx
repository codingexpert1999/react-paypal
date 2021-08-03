import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRefunds, getSubscriptions, getTransactions } from '../../actions/transaction'
import Sidenav from './Sidenav'
import Transaction from './transaction/Transaction'
import Refund from './refund/Refund'
import Subsctription from './subsctiption/Subscription'

const Profile = () => {
    const dispatch = useDispatch()

    const {user, token} = useSelector(state => state.user)
    const {transactions, refunds, subscriptions} = useSelector(state => state.transaction)

    const [selectedComponent, setSelectedComponent] = useState('transactions')

    useEffect(() => {
        dispatch(getTransactions(user._id, token))
        dispatch(getRefunds(user._id, token))
        dispatch(getSubscriptions(user._id, token))
    }, [])

    return (
        <div className="profile">
            <Sidenav setSelectedComponent={setSelectedComponent}/>

            <div className="profile-right">
                {
                    selectedComponent === "transactions" &&
                    <>
                        <h2>My Transactions</h2>

                        <ul className="list">
                            {transactions.map(transaction => (
                                <Transaction key={Date.now() + Math.random() + ""} transaction={transaction} />
                            ))}
                        </ul>
                    </>
                }

                {
                    selectedComponent === "refunds" &&
                    <>
                        <h2>My Refunds</h2>

                        <ul className="list">
                            {refunds.map(refund => (
                                <Refund key={Date.now() + Math.random() + ""} refund={refund} />
                            ))}
                        </ul>
                    </>
                }

                {
                    selectedComponent === "subscriptions" &&
                    <>
                        <h2>My Subscriptions</h2>

                        <ul className="list">
                            {subscriptions.map(subscription => (
                                <Subsctription key={Date.now() + Math.random() + ""} subscription={subscription} />
                            ))}
                        </ul>
                    </>
                }
            </div>
        </div>
    )
}

export default Profile
