import React, { useState, useEffect} from 'react'

import { Button } from 'react-bootstrap';

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

    const newPedidoHandler = (e, status) => {
        e.preventDefault();
        let data = {
            idCliente: '604d7b10b3cc2474fa21ac0c',
            info: [
                '604d7f9d9b0f2b78e3d59910',
                '604d801d22885b79ebd38297',
                '604d80911cad697a4c8bb044',
                '604d80ae1cad697a4c8bb046'
            ],
            cost: 0,
            status
        }
        newOrder({ data, orders, setOrders })
    }

    const setOrderHandler = (order) => {
        setOrder(order);
    }

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
        let indexDelete = ordersArray.findIndex(element => element.id === id);
        ordersArray.splice(indexDelete, 1);

        deleteOrder({
            id,
            setOrders,
            ordersArray
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
                        />}

                    {
                        localStorage.getItem('type') === 'admin' &&
                        <>
                            <Button variant='outline-success' className='p-2 m-2' onClick={(e) => newPedidoHandler(e, 1)}>Agregar Pedido En Espera</Button>
                            <Button variant='outline-danger' className='p-2 m-2' onClick={(e) => newPedidoHandler(e, 0)}>Agregar Pedido Cancelado</Button>
                        </>
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
