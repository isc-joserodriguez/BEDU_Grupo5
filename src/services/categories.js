import axios from 'axios';

export const getCategories = ({ setCategories, setLoading }) => {
    axios.get(
        `${process.env.REACT_APP_API_Connect}/categoria`, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    }).then(res => {
        setCategories([...res.data.detail]);
        setLoading(false)
    }).catch(err => {
        setLoading(false)
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