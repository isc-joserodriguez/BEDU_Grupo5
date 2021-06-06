import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import NewOrders from '../NewOrders/NewOrders'
import OrderHistory from '../OrderHistory/OrderHistory'
import classes from './Mesero.module.css';

const Mesero = () => {
  const { path } = useRouteMatch();

  return (
    <div className={classes.Meserobg}>
      <Switch>
        <Route path={`${path}/`} exact>
            <NewOrders />
        </Route>
        <Route path={`${path}/my-orders`}>
          <OrderHistory />
        </Route>
      </Switch>
    </div>
  )
};

export default Mesero;
