import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import {logOut} from '../actions/user'

const Navbar = () => {
    const dispatch = useDispatch()

    const {isAuthenticated} = useSelector(state => state.user)

    return (
        <nav>
            <Link to="/">
                <span className="nav-brand">MyStore</span>
            </Link>

            <ul className="nav">
                {
                    !isAuthenticated ? 
                    <>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    </>
                    :
                    <>
                        <li>
                            <Link to="/create-order">Create Order</Link>
                        </li>
                        <li>
                            <Link to="/profile">Profile</Link>
                        </li>
                    </>
                }
            </ul>
        </nav>
    )
}

export default Navbar
