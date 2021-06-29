import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTransactions } from '../../actions/transaction'
import Sidenav from './Sidenav'
import Transaction from './transaction/Transaction'

const Profile = () => {
    const dispatch = useDispatch()

    const {user, token} = useSelector(state => state.user)
    const {transactions} = useSelector(state => state.transaction)

    useEffect(() => {
        dispatch(getTransactions(user._id, token))
    }, [])

    return (
        <div className="profile">
            <Sidenav/>

            <div className="profile-right">
                <h2>My Transactions</h2>

                <ul className="list">
                    {transactions.map(transaction => (
                        <Transaction key={Date.now() + Math.random() + ""} transaction={transaction} />
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Profile
