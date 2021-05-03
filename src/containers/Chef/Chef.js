import React, { useState, useEffect } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import OrderCard from '../../components/UI/OrderCard/OrderCard'

import OrderHistory from '../OrderHistory/OrderHistory';
import NewOrders from '../NewOrders/NewOrders';
import NotFound from '../../components/NotFound/NotFound';

import { filterOrders, updateState } from '../../services';

const Chef = () => {
    const { path } = useRouteMatch();
    const [loading, setLoading] = useState(false);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [order, setOrder] = useState({})
    const [orders, setOrders] = useState([]);
    const changeStatusHandler = (id) => {
        let ordersArray = [...orders];
        let indexModif = ordersArray.findIndex(element => element._id === id);
        ordersArray[indexModif].status++;
        updateState({
            id: ordersArray[indexModif]._id,
            data: { status: ordersArray[indexModif].status },
            setLoading,
            setFilteredOrders: setOrders,
            ordersArray,
            setOrder,
            setOrders,
            filter: {
                status: -1
            }
        })
    }

    useEffect(() => {
        const interval = setInterval(() => {
            filterOrders({
                setLoading, setFilteredOrders, setOrders, filter: { status: -1 }
            });
        }, 5000);
        return () => clearInterval(interval);
    }, [])

    return (
        <>
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
        </>
    )
};

export default Chef
