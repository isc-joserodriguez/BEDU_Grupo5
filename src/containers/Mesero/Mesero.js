import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import NewOrders from '../NewOrders/NewOrders'
import OrderHistory from '../OrderHistory/OrderHistory'

const Mesero = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/`} exact>
        <NewOrders />
      </Route>
      <Route path={`${path}/my-orders`}>
        <OrderHistory />
      </Route>
    </Switch>
  )
};

export default Mesero;
