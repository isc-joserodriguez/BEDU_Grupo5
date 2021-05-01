import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import Foods from './Foods/Foods';
import OrderHistory from '../OrderHistory/OrderHistory'

const Mesero = () => {
    const { path } = useRouteMatch();

    return (
        <Switch>
            <Route path={`${path}/menu`}>
                <Foods />
            </Route>
            <Route path={`${path}/my-orders`}>
                <OrderHistory />
            </Route>
        </Switch>
    )
}

export default Mesero;
