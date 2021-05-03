import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import Foods from './Foods/Foods';
import OrderHistory from '../OrderHistory/OrderHistory'

const Client = () => {
    const { path } = useRouteMatch();

    return (
        <Switch>
            <Route path={`${path}/`} exact>
                <Foods />
            </Route>
            <Route path={`${path}/my-orders`}>
                <OrderHistory />
            </Route>
        </Switch>
    )
}

export default Client;
