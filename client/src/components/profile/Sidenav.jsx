import React from 'react'
import { useDispatch } from 'react-redux'
import { logOut } from '../../actions/user'

const Sidenav = ({setSelectedComponent}) => {
    const dispatch = useDispatch()
    
    return (
        <ul className="sidenav">
            <li onClick={() => setSelectedComponent("transactions")}>My Transactions</li>
            <li onClick={() => setSelectedComponent("refunds")}>My Refunds</li>
            <li onClick={() => setSelectedComponent("subscriptions")}>My Subscriptions</li>
            <li onClick={() => dispatch(logOut())}>Log Out</li>
        </ul>
    )
}

export default Sidenav
