import React, { useState, useEffect } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import OrderCard from '../OrderCard/OrderCard'
import Products from './Products/Products';
import OrderHistory from '../OrderHistory/OrderHistory';
import NotFound from '../../components/NotFound/NotFound';
import classes from './Cliente.module.css';

import { getProcessing, updateState } from '../../services';

const Client = () => {
    const { path } = useRouteMatch();
    const [orders, setOrders] = useState([]);

    const changeStatusHandler = async (id) => {
        let ordersArray = [...orders];
        let indexModif = ordersArray.findIndex(element => element._id === id);
        await updateState({
            id: ordersArray[indexModif]._id,
            data: { status: 0 }
        });
        await getProcessing({ setOrders });
    }

    useEffect(() => {
        getProcessing({ setOrders });
        const interval = setInterval(() => {
            getProcessing({ setOrders });
        }, 5000);
        return () => clearInterval(interval);
    }, [])

    return (
        <div className={classes.Clientebg}>
        
            {orders.length !== 0 && <OrderCard changeStatusHandler={changeStatusHandler} order={orders[0]} />}
            <Switch>
                <Route path={`${path}/`} exact>
                    <Products />
                </Route>
                <Route path={`${path}/my-orders`}>
                    <OrderHistory />
                </Route>
                <Route>
                    <NotFound />
                </Route>
            </Switch>
        
        </div>
    )
}

export default Client;
