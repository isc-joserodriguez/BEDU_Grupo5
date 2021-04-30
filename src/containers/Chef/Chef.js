import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import OrderHistory from '../OrderHistory/OrderHistory';
import NewOrders from '../NewOrders/NewOrders';

const Chef = () => {
    const { path } = useRouteMatch();

    return (
        <>
            <Switch>
                <Route path={`${path}/new-orders`}>
                    <NewOrders />
                </Route>
                <Route path={`${path}/my-orders`}>
                    <OrderHistory />
                </Route>
            </Switch>
        </>
    )
};

export default Chef
