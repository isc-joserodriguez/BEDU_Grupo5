import React, { useState, useEffect } from 'react';
import Filters from './Filters';
import OrdersList from './OrdersList.js';

import { Button } from 'react-bootstrap';
import { filterOrders, newOrder, deleteOrder } from '../../services';

import classes from './chef.module.css';

function Chef() {
    const [orders, setOrders] = useState([]);
    const [value, setValue] = useState('');
    const [show, setShow] = useState(false);
    const [filteredOrders, setFilteredOrders] = useState([]);

    const filterDo = () => {
        if (value.trim() !== "") {
            setFilteredOrders([...orders].filter(e => (-1 !== e.task.search(value))));
        } else {
            setFilteredOrders([...orders]);
        }
    };

    useEffect(() => {
        filterOrders({ setOrders, setFilteredOrders, filter: {} })
    }, []);

    useEffect(() => {
        filterDo();
    }, [orders]);

    const newPedidoHandler = (e, status) => {
        e.preventDefault();
        let data = {
            idCliente: "604d7b10b3cc2474fa21ac0c",
            info: [
                "604d7f9d9b0f2b78e3d59910",
                "604d801d22885b79ebd38297",
                "604d80911cad697a4c8bb044",
                "604d80ae1cad697a4c8bb046"
            ],
            cost: 0,
            status
        }
        newOrder({ data, orders, setOrders })
    }

    const changeStatusHandler = (id) => {
        let ordersArray = [...orders];
        let indexModif = ordersArray.findIndex(element => element.id === id);
        ordersArray[indexModif].status = !ordersArray[indexModif].status;
        setOrders(ordersArray);
        filterDo();
    }

    const handleClickDelete = (id) => {
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
        if (newValue === "") setFilteredOrders([...orders]);
        setValue(newValue);
    }

    const showHide = () => {
        setShow(!show);
    }

    return (
        <div className={`${classes.Chef}`}>
            <div className={classes.card}>
                <Filters showHide={showHide} filterDo={filterDo} orders={orders} show={show} value={value} changeValue={changeValue} />
                <OrdersList change={changeStatusHandler} orders={filteredOrders} show={show} delete={handleClickDelete} filterDo={filterDo} value={value} />
                <Button variant="outline-success" className='p-2 m-2' onClick={(e) => newPedidoHandler(e, 1)}>Agregar Pedido En Espera</Button>
                <Button variant="outline-danger" className='p-2 m-2' onClick={(e) => newPedidoHandler(e, 0)}>Agregar Pedido Cancelado</Button>
            </div>
        </div>
    );
};

export default Chef
