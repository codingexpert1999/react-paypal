import React from 'react'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'

const Layout = () => {
    const {user, isAuthenticated} = useSelector(state => state.user)

    return (
        <div className="layout">
            {
                !isAuthenticated ? 
                <>
                    <p>Welcome to MyStore!</p>

                    <p>
                        Please register to make a payment!
                    </p>

                    <div className="button-group">
                        <Link to="/register">Register</Link>
                        <Link to="/login">Login</Link>
                    </div>
                </>
                :
                <>
                    <p>Welcome back {user.firstName} {user.lastName}</p>
                    <p>Buy our awesome product!</p>
                    <div className="button-group">
                        <Link to="/create-order">Click Here</Link>
                    </div>
                </>
            }
        </div>
    )
}

export default Layout
