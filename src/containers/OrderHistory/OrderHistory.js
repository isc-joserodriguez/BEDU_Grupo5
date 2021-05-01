import React, { useState, useEffect } from 'react'

import Filters from './Filters/Filters';
import OrdersList from './OrdersList/OrdersList.js';
import OrderModal from '../../components/UI/OrderModal.js/OrderModal';
import Spinner from '../../components/UI/Spinner/Spinner';

import { filterOrders, newOrder, deleteOrder, updateState } from '../../services';

import classes from './OrderHistory.module.css';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [value, setValue] = useState('');
    const [show, setShow] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState({
        _id: '',
        idCliente: {},
        idChef: {},
        idMesero: {},
    });

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const filterHandler = () => {
        if (value.trim() !== '') {
            setFilteredOrders([...orders].filter(e => (-1 !== e.task.search(value))));
        } else {
            setFilteredOrders([...orders]);
        }
    };

    useEffect(() => {
        filterOrders({ setOrders, setFilteredOrders, filter: {}, setLoading })
    }, []);

    useEffect(() => {
        filterHandler();
    }, [orders]);

    const setOrderHandler = (order) => setOrder(order);

    const changeStatusHandler = (id) => {
        let ordersArray = [...orders];
        let indexModif = ordersArray.findIndex(element => element._id === id);
        switch (ordersArray[indexModif].status) {
            case 1:
                ordersArray[indexModif].status = localStorage.getItem('type') === 'admin' ? 0 : 2;
                break;
            default:
                ordersArray[indexModif].status = localStorage.getItem('type') === 'admin' ? ordersArray[indexModif].status : ordersArray[indexModif].status + 1;
                break;
        }
        setLoading(true);
        updateState({
            id: ordersArray[indexModif]._id,
            data: { status: ordersArray[indexModif].status },
            setOrder,
            setLoading
        })

        setOrders(ordersArray);
    }

    const deleteOrderHandler = (id) => {
        let ordersArray = [...orders]
        console.log(ordersArray[0]);
        let indexDelete = ordersArray.findIndex(element => element._id === id);
        console.log(indexDelete);
        ordersArray.splice(indexDelete, 1);
        /* setLoading(true); */
        deleteOrder({
            id,
            setOrders,
            ordersArray,
            setLoading
        })
    }

    const changeValue = (newValue) => {
        if (newValue === '') setFilteredOrders([...orders]);
        setValue(newValue);
    }

    const showHide = () => {
        setShow(!show);
    }

    return (
        <>
            <div className={`${classes.OrderHistory}`}>
                <div className={classes.card}>
                    <Filters
                        showHide={showHide}
                        filterHandler={filterHandler}
                        orders={orders}
                        show={show}
                        value={value}
                        changeValue={changeValue}
                    />
                    {loading ?
                        <Spinner /> :
                        <OrdersList
                            change={changeStatusHandler}
                            orders={filteredOrders}
                            show={show}
                            delete={deleteOrderHandler}
                            filterHandler={filterHandler}
                            value={value}
                            setOrder={setOrderHandler}
                            handleShow={handleShow}
                        />
                    }
                </div>
            </div>

            <OrderModal
                order={order}
                show={showModal}
                handleShow={handleShow}
                handleClose={handleClose}
                changeStatusHandler={changeStatusHandler}
                loading={loading}
            />
        </>
    )
}

export default OrderHistory
