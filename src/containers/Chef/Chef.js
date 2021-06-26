import React, { useState, useEffect } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import OrderCard from '../OrderCard/OrderCard'

import OrderHistory from '../OrderHistory/OrderHistory';
import NewOrders from '../NewOrders/NewOrders';
import NotFound from '../../components/NotFound/NotFound';

import { timeInterval } from '../../shared/utility';

import { getProcessing, updateState } from '../../services';
import classes from './Chef.module.css';

const Chef = () => {
    const { path } = useRouteMatch();
    const [orders, setOrders] = useState([]);

    const changeStatusHandler = async (id) => {
        let ordersArray = [...orders];
        let indexModif = ordersArray.findIndex(element => element._id === id);
        ordersArray[indexModif].status++;
        await updateState({
            id: ordersArray[indexModif]._id,
            data: { status: ordersArray[indexModif].status }
        })
        await getProcessing({ setOrders });
    }

    useEffect(() => {
        getProcessing({ setOrders });
        const interval = setInterval(() => {
            getProcessing({ setOrders });
        }, timeInterval);
        return () => clearInterval(interval);
    }, [])

    return (
        <div className={classes.background} style={{}}>
            {orders.length !== 0 && <OrderCard changeStatusHandler={changeStatusHandler} order={orders[0]} />}
            <Switch>
                <Route path={`${path}/`} exact>
                    <NewOrders />
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
};

export default Chef
