import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Layout from '../layout/Layout'
import Paypal from '../paypal/Paypal'
import Register from '../auth/Register'
import Login from '../auth/Login'
import PrivateRoute from './PrivateRoute'
import Profile from '../profile/Profile'

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={Layout} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <PrivateRoute exact path="/create-order" component={Paypal}/>
            <PrivateRoute exact path="/profile" component={Profile} />
        </Switch>
    )
}

export default Routes
