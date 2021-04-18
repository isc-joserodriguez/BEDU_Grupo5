import React, { useState } from 'react';
import Filters from './Filters';
import OrdersList from './OrdersList.js';

import classes from './chef.module.css';

function Chef() {
    const [orders, setOrders] = useState([{ task: 'hola', status: false, id: (Math.random() * 1000).toFixed() }, { task: 'hola2', status: true, id: (Math.random() * 1000).toFixed() }, { task: 'hola3', status: true, id: (Math.random() * 1000).toFixed() }]);
    const [value, setValue] = useState('');
    const [show, setShow] = useState(false);
    const [filteredOrders, setFilteredOrders] = useState([...orders]);

    const changeStatusHandler = (id) => {
        let arr = [...orders]
        let indexModif = arr.findIndex(element => element.id === id);
        arr[indexModif].status = !arr[indexModif].status;
        setOrders(arr);
    }

    const handleClickDelete = (id) => {
        let arr = [...orders]
        let indexDelete = arr.findIndex(element => element.id === id);
        arr.splice(indexDelete, 1);
        setOrders(arr);
    }

    const changeValue = (newValue) => {
        if (newValue === "") setFilteredOrders([...orders]);
        setValue(newValue);
    }

    const showHide = () => {
        setShow(!show);
    }

    const filterDo = () => {
        if (value.trim() !== "")
            setFilteredOrders([...orders].filter(e => (-1 !== e.task.search(value))));
    }

    return (
        <div className={`${classes.Chef}`}>
            <div className={classes.card}>
                <Filters showHide={showHide} filterDo={filterDo} orders={orders} show={show} value={value} changeValue={changeValue} />
                <OrdersList change={changeStatusHandler} orders={filteredOrders} show={show} delete={handleClickDelete} filterDo={filterDo} value={value} />
            </div>
        </div>
    );
};

export default Chef
