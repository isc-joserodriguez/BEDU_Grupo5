import axios from 'axios';

export const getCategories = ({ setCategories, setLoading }) => {
    axios.get(
        `${process.env.REACT_APP_API_Connect}/categoria`, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    }).then(res => {
        setCategories(res.data.detail);
        setLoading(false)
    }).catch(err => {
        setLoading(false)
        console.log(err);
    });
}

export const filterCategories = ({ setCategories, setLoading, filter }) => {
    axios.post(
        `${process.env.REACT_APP_API_Connect}/categoria/filtrar`, filter, {
        headers: {
            'Authorization': localStorage.getItem('token')
        },
    }).then(res => {
        setCategories(res.data.detail);
        setLoading(false);
    }).catch(err => {
        setLoading(false);
        console.log(err);
    });
}

export const getCategoryById = ({ id, setCategory, setLoading }) => {
    axios.get(
        `${process.env.REACT_APP_API_Connect}/categoria/${id}`, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    }).then(res => {
        setCategory(res.data.detail);
        setLoading(false)
    }).catch(err => {
        setLoading(false)
        console.log(err);
    });
}

export const createCategory = ({ data, setLoading, setErrorMessage, history }) => {
    axios.post(`${process.env.REACT_APP_API_Connect}/categoria`, data, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    }).then(res => {
        setLoading(false);
        history.push(`/admin/categories`);
    }).catch(err => {
        setErrorMessage(true)
        setLoading(false);
    });
}

export const getCategoryByIdForm = ({ id, editForm, setEditForm, updateObject, setLoading }) => {
    axios.get(
        `${process.env.REACT_APP_API_Connect}/categoria/${id}`, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    }).then(res => {
        let updatedControls = updateObject(editForm, {
            name: updateObject(editForm.name, {
                value: res.data.detail.name,
                valid: true,
                touched: true
            }),
            description: updateObject(editForm.description, {
                value: res.data.detail.description,
                valid: true,
                touched: true
            })
        });
        setEditForm(updatedControls);
        setLoading(false);
    }).catch(err => {
        setLoading(false)
        console.log(err);
    });
}

export const editCategory = ({ id, data, setLoading, setErrorMessage, history }) => {
    axios.put(
        `${process.env.REACT_APP_API_Connect}/categoria/editar/${id}`, data, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    }).then(res => {
        setLoading(false);
        history.push(`/${localStorage.getItem('type')}/categories`)
    }).catch(err => {
        console.log(err);
        setLoading(false);
        setErrorMessage(true);
    });
}

export const getCategoriesCommands = ({ setCategories }) => {
    axios.get(
        `${process.env.REACT_APP_API_Connect}/productos`, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    }).then(res => {
        let datas = {}
        res.data.detail.forEach(product => (datas = { ...datas, [product.idCategoria._id]: product.idCategoria.name }));
        let ids = res.data.detail.map(product => (product.idCategoria._id))
        ids = [...new Set(ids)];
        setCategories(ids.map(id => ({
            _id: id,
            name: datas[id]
        })))
    }).catch(err => {
        console.log(err);
    });
}

export const toggleStatusCategory = ({ id, status }) => {
    axios.put(
        `${process.env.REACT_APP_API_Connect}/categoria/cambiarEstatus/${id}`, { status }, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    }).then(res => {

    }).catch(err => {
        console.log(err);
    });
}