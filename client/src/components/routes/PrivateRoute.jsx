import React from 'react'
import { useSelector } from 'react-redux';
import {Redirect} from 'react-router-dom'

const PrivateRoute = ({component: Component, ...rest}) => {
    const {isAuthenticated} = useSelector(state => state.user);

    return (
        isAuthenticated ?
        <Component {...rest} />
        : <Redirect to="/login" />
    )
}

export default PrivateRoute
