import axios from 'axios';
export const getFoods = ({ setFoods, setLoading, setCategories }) => {
    axios.get(
        `${process.env.REACT_APP_API_Connect}/productos`, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    }).then(res => {
        setFoods(res.data.detail);
        setLoading(false);
    }).catch(err => {
        setLoading(false);
        console.log(err);
    });
}
export const getFoodById = ({ id, setFood }) => {
    axios.get(
        `${process.env.REACT_APP_API_Connect}/productos/${id}`, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    }).then(res => {
        setFood(res.data.detail);
    }).catch(err => {
        console.log(err);
    });
}
export const getFoodsByCategory = ({ setFoods, setLoading, data }) => {
    axios.post(
        `${process.env.REACT_APP_API_Connect}/productos/filtrar`, { idCategoria: data }, {
        headers: {
            'Authorization': localStorage.getItem('token')
        },
    }).then(res => {
        setFoods(res.data.detail);
        setLoading(false);
    }).catch(err => {
        setLoading(false);
        console.log(err);
    });
}
export const createPedido = ({ setLoading, info, cost }) => {
    var payload = {
        info: info,
        cost: cost
    };
    axios.post(
        `${process.env.REACT_APP_API_Connect}/pedido`, payload, {
        headers: {
            'Authorization': localStorage.getItem('token')
        },
    }).then(res => {
        
    }).catch(err => {
        console.log(err.message);
    });
}

export const getCategoriesCommands = ({ setCategories, setLoading }) => {
    axios.get(
        `${process.env.REACT_APP_API_Connect}/categoria`, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    }).then(res => {
        setCategories(
            res.data.detail.map(el => ({ _id: el._id, name: el.name }))
        );
        setLoading(false);
    }).catch(err => {
        setLoading(false)
        console.log(err);
    });
}