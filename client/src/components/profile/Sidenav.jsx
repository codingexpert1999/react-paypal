import React from 'react'
import { useDispatch } from 'react-redux'
import { logOut } from '../../actions/user'

const Sidenav = () => {
    const dispatch = useDispatch()
    
    return (
        <ul className="sidenav">
            <li>My Transactions</li>
            <li>My Subscriptions</li>
            <li onClick={() => dispatch(logOut())}>Log Out</li>
        </ul>
    )
}

export default Sidenav
