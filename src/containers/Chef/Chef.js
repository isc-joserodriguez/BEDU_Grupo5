import React, { useState } from 'react';
import './chef.css';
import Filters from './Filters';
import OrdersList from './OrdersList.js';


function Chef() {
    const [tasks, setTasks] = useState([{ task: 'hola', status: false, id: (Math.random() * 1000).toFixed() }, { task: 'hola2', status: true, id: (Math.random() * 1000).toFixed() }, { task: 'hola3', status: true, id: (Math.random() * 1000).toFixed() }]);
    const [value, setValue] = useState('');
    const [show, setShow] = useState(false);
    const [filter, setFilter] = useState(false);
    const change = (id) => {
        let arr = [...tasks]
        let indexModif = arr.findIndex(element => element.id === id);
        arr[indexModif].status = !arr[indexModif].status;
        setTasks(arr);
    }

    const handleClickDelete = (id) => {
        let arr = [...tasks]
        let indexDelete = arr.findIndex(element => element.id === id);
        arr.splice(indexDelete, 1);
        setTasks(arr);
    }


    const changeValue = (newValue) => {
        setValue(newValue);
    }

    const showHide = () => {
        setShow(!show);
    }

    const filterDo = () => {
        setFilter(!filter);
    }

    return (
        <div className="wrapper">
            <div className="card frame">
                <Filters showHide = {showHide} filterDo={filterDo} tasks={tasks} show={show} value={value} changeValue={changeValue} />
                <OrdersList change={change} tasks={tasks} filter={filter} show={show} delete={handleClickDelete} filterDo={filterDo} value={value}/>
            </div>
        </div>
    );
};

export default Chef
