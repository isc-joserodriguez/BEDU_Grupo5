import axios from 'axios';

export const filterOrders = ({ setOrders, setFilteredOrders, filter }) => {
    axios.post(
        `${process.env.REACT_APP_API_Connect}/pedido/filtrar`, filter, {
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

export const deleteOrder = ({ id, setOrders, ordersArray }) => {
    axios.delete(
        `${process.env.REACT_APP_API_Connect}/pedido/${id}`, {
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