import axios from 'axios';
export const filterOrders = async ({ setOrders, setLoading, filter }) => {
    await axios.post(
        `${process.env.REACT_APP_API_Connect}/pedido/filtrar`, filter, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    }).then(res => {
        let ordersArray = res.data.detail;
        setOrders(ordersArray);
        if (setLoading) setLoading(false);
    }).catch(err => {
        if (setLoading) setLoading(false);
        console.log(err);
    });
}
export const getProcessing = async ({ setOrders, setLoading }) => {
    await axios.get(
        `${process.env.REACT_APP_API_Connect}/pedido/procesando`, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    }).then(res => {
        let ordersArray = res.data.detail;
        setOrders(ordersArray);
        if (setLoading) setLoading(false);
    }).catch(err => {
        if (setLoading) setLoading(false);
        console.log(err);
    });
}

export const getOwners = async ({ setOrders, setLoading }) => {
    await axios.get(
        `${process.env.REACT_APP_API_Connect}/pedido/propios`, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    }).then(res => {
        let ordersArray = res.data.detail;
        setOrders(ordersArray);
        if (setLoading) setLoading(false);
    }).catch(err => {
        if (setLoading) setLoading(false);
        console.log(err);
    });
}

export const getPending = async ({ setOrders, setLoading }) => {
    await axios.get(
        `${process.env.REACT_APP_API_Connect}/pedido/pendientes`, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    }).then(res => {
        let ordersArray = res.data.detail;
        setOrders(ordersArray);
        if (setLoading) setLoading(false);
    }).catch(err => {
        if (setLoading) setLoading(false);
        console.log(err);
    });
}
export const newOrder = ({ setOrders, data, orders }) => {
    axios.post(
        `${process.env.REACT_APP_API_Connect}/pedido`, data, {
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
export const deleteOrder = ({ id, setOrders, ordersArray, setLoading }) => {
    axios.delete(
        `${process.env.REACT_APP_API_Connect}/pedido/${id}`, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    }).then(res => {
        setOrders([...ordersArray]);
        setLoading(false)
    }).catch(err => {
        /* console.log(err.toJSON()); */
        alert('No se puede eliminar un pedido que no está cancelado')
    });
}
export const getOrderById = ({ id, setOrder, setLoading }) => {
    axios.get(
        `${process.env.REACT_APP_API_Connect}/pedido/${id}`, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    }).then(res => {
        setOrder(res.data.detail);
        setLoading(false);
    }).catch(err => {
        setLoading(false);
        console.log(err);
    });
}
export const updateState = async ({ id, data, setLoading, setOrder }) => {
    await axios.put(
        `${process.env.REACT_APP_API_Connect}/pedido/cambiarEstatus/${id}`, data, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    }).then(res => {
        setOrder(res.data.detail);
        if (setLoading) setLoading(false)
    }).catch(err => {
        if (setLoading) setLoading(false)
        console.log(err);
    });
}