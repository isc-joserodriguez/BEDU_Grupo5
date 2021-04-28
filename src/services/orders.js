import axios from 'axios';
export const filterOrders = ({ setOrders, setFilteredOrders, filter }) => {
    axios.post(
        'https://bedu-api-restaurante.herokuapp.com/v1/pedido/filtrar', filter, {
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
}
export const newOrder = ({ setOrders, data, orders }) => {
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
export const deleteOrder = ({ id, setOrders, ordersArray }) => {
    axios.delete(
        `https://bedu-api-restaurante.herokuapp.com/v1/pedido/${id}`, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    }).then(res => {
        setOrders([...ordersArray]);
        alert('Pedido eliminado');
    }).catch(err => {
        console.log(err);
        alert('No se puede eliminar un pedido que no está cancelado')
    });
}
export const getOrdersHistory = ({ setOrders, setFilteredOrders, setLoading }) => {
    axios.get(
        'https://bedu-api-restaurante.herokuapp.com/v1/pedido/verHistorial/999', {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    }).then(res => {
        console.log(res);
        setOrders(res.data.detail);
        setLoading(false);
    }).catch(err => {
        setLoading(false);
        console.log(err);
    });
}
export const getOrderById = ({ id, setOrder }) => {
    axios.get(
        `https://bedu-api-restaurante.herokuapp.com/v1/pedido/${id}`, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    }).then(res => {
        setOrder(res.data.detail);
    }).catch(err => {
        console.log(err);
    });
}