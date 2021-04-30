import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import Register from './Register/Register';
import Menu from './Menu/Menu';
import OrderHistory from '../OrderHistory/OrderHistory';

const Admin = () => {
    const { path } = useRouteMatch();

    return (
        <>
            <Switch>
                <Route path={`${path}/new-user`}>
                    <Register />
                </Route>
                <Route path={`${path}/menu`}>
                    <Menu />
                </Route>
                <Route path={`${path}/pedidos`}>
                    <OrderHistory />
                </Route>
            </Switch>
        </>
    )
}

export default Admin