import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Layout from '../layout/Layout'
import Register from '../auth/Register'
import Login from '../auth/Login'
import PrivateRoute from './PrivateRoute'
import Profile from '../profile/Profile'
import OrderButton from '../paypal/OrderButton'
import SubscriptionButton from '../paypal/SubscribeButton'

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={Layout} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <PrivateRoute exact path="/create-order" component={OrderButton}/>
            <PrivateRoute exact path="/subscribe" component={SubscriptionButton}/>
            <PrivateRoute exact path="/profile" component={Profile} />
        </Switch>
    )
}

export default Routes
