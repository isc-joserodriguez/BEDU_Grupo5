import React, { useState, useEffect } from 'react';
import Filters from './Filters';
import OrdersList from './OrdersList.js';
import axios from 'axios'

import { Button } from 'react-bootstrap';

import classes from './chef.module.css';

function Chef() {
    const [orders, setOrders] = useState([]);
    const [value, setValue] = useState('');
    const [show, setShow] = useState(false);
    const [filteredOrders, setFilteredOrders] = useState([]);

    useEffect(() => {
        axios.post(
            'https://bedu-api-restaurante.herokuapp.com/v1/pedido/filtrar', {}, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        }).then(res => {
            let ordersArray = res.data.detail.map(el => { return { task: el.status !== 0 ? `hola ${el._id}` : 'Pedido Cancelado', status: el.status > 1, id: el._id } });
            setOrders([...ordersArray]);
            setFilteredOrders([...ordersArray]);
        }).catch(err => {
            console.log(err);
        });
    }, []);

    useEffect(() => {
        filterDo();
    }, [orders])

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
        axios.post(
            'https://bedu-api-restaurante.herokuapp.com/v1/pedido', data, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        }).then(res => {
            let ordersArray = [...orders];
            ordersArray.push({ task: res.data.detail.status !== 0 ? `hola ${res.data.detail._id}` : 'Pedido Cancelado', status: false, id: res.data.detail._id });
            setOrders([...ordersArray]);
        }).catch(err => {
            console.log(err);
        });
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
        axios.delete(
            `https://bedu-api-restaurante.herokuapp.com/v1/pedido/${id}`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        }).then(res => {
            setOrders([...ordersArray]);
        }).catch(err => {
            console.log(err);
        });
    }

    const changeValue = (newValue) => {
        if (newValue === "") setFilteredOrders([...orders]);
        setValue(newValue);
    }

    const showHide = () => {
        setShow(!show);
    }

    const filterDo = () => {
        if (value.trim() !== "") {
            setFilteredOrders([...orders].filter(e => (-1 !== e.task.search(value))));
        } else {
            setFilteredOrders([...orders]);
        }
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
