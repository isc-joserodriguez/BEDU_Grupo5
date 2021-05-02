import axios from 'axios';

export const getUsers = ({ setUsers, setLoading }) => {
    axios.get(
        `${process.env.REACT_APP_API_Connect}/usuarios`, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    }).then(res => {
        setUsers([...res.data.detail]);
        setLoading(false);
    }).catch(err => {
        setLoading(false)
        console.log(err);
    });
}

export const getUserById = ({ id, setUser, setLoading }) => {
    axios.get(
        `${process.env.REACT_APP_API_Connect}/usuarios/${id}`, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    }).then(res => {
        setUser(res.data.detail);
        setLoading(false);
    }).catch(err => {
        setLoading(false)
        console.log(err);
    });
}


/* export const filterUsers = ({ setUsers, setFilteredUsers, filter }) => {
    axios.post(
        `${process.env.REACT_APP_API_Connect}/usuarios`, filter, {
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
} */