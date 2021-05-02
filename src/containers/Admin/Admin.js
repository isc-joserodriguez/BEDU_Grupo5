import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import OrderHistory from '../OrderHistory/OrderHistory';
import NewOrders from '../NewOrders/NewOrders'
import Users from './Users/Users';
import User from './Users/User/User';
import Register from './Register/Register';
import Menu from './Menu/Menu';;


const Admin = () => {
    const { path } = useRouteMatch();

    return (
        <Switch>
            <Route path={`${path}/`} exact>
                <NewOrders />
            </Route>
            <Route path={`${path}/orders-history`} >
                <OrderHistory />
            </Route>
            <Route path={`${path}/new-user`}>
                <Register />
            </Route>
            <Route path={`${path}/menu`}>
                <Menu />
            </Route>
            <Route path={`${path}/users/:id`}>
                <User />
            </Route>
            <Route path={`${path}/users`}>
                <Users />
            </Route>
            <Route path={`${path}/users/:id`}>
                <User />
            </Route>
            <Route path={`${path}/users`}>
                <Users />
            </Route>
        </Switch>
    )
}

export default Admin