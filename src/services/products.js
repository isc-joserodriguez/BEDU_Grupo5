import axios from 'axios';
export const createProduct = ({ data, setLoading, setErrorMessage, history }) => {
    axios.post(
        `${process.env.REACT_APP_API_Connect}/productos/`, data, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    }).then(res => {
        setLoading(false);
        setErrorMessage(false)
        history.push('/admin/products');
    }).catch(err => {
        console.log(err);
        setErrorMessage(true)
        setLoading(false);
    });
}

export const getProductById = ({ id, setProduct, setLoading }) => {
    axios.get(
        `${process.env.REACT_APP_API_Connect}/productos/${id}`, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    }).then(res => {
        setProduct(res.data.detail);
        if (setLoading) setLoading(false);
    }).catch(err => {
        console.log(err);
        if (setLoading) setLoading(false);
    });
}

export const getProducts = ({ setProducts, setLoading }) => {
    axios.get(
        `${process.env.REACT_APP_API_Connect}/productos`, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    }).then(res => {
        setProducts(res.data.detail);
        setLoading(false);
    }).catch(err => {
        setLoading(false);
        console.log(err);
    });
}

export const getCategoriesSelector = ({ editForm, setEditForm, setLoading, updateObject }) => {
    axios.get(
        `${process.env.REACT_APP_API_Connect}/categoria`, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    }).then(res => {
        let categories = res.data.detail.map((category) => ({
            value: category._id,
            displayValue: category.name
        }))

        setEditForm(
            updateObject(editForm, {
                category: updateObject(editForm.category, {
                    value: categories[0].value,
                    elementConfig: {
                        options: categories
                    }
                })
            })
        );
        setLoading(false);
    }).catch(err => {
        setLoading(false)
        console.log(err);
    });
}

export const getProductsByCategory = ({ setProducts, setLoading, data }) => {
    axios.post(
        `${process.env.REACT_APP_API_Connect}/productos/filtrar`, { idCategoria: data }, {
        headers: {
            'Authorization': localStorage.getItem('token')
        },
    }).then(res => {
        setProducts(res.data.detail);
        setLoading(false);
    }).catch(err => {
        setLoading(false);
        console.log(err);
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

export const editProduct = ({ id, data, setLoading, setErrorMessage, history }) => {
    axios.put(
        `${process.env.REACT_APP_API_Connect}/productos/editar/${id}`, data, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    }).then(res => {
        setLoading(false);
        history.push(`/${localStorage.getItem('type')}/products`)
    }).catch(err => {
        console.log(err);
        setLoading(false);
        setErrorMessage(true);
    });
}

export const getProductByIdForm = ({ id, editForm, setEditForm, updateObject, setLoading }) => {
    axios.get(
        `${process.env.REACT_APP_API_Connect}/productos/${id}`, {
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
            }),
            cost: updateObject(editForm.cost, {
                value: res.data.detail.cost,
                valid: true,
                touched: true
            }),
            image: updateObject(editForm.image, {
                value: res.data.detail.image,
                valid: true,
                touched: true
            })
        });
        getCategoriesSelector({ editForm: updatedControls, setEditForm, setLoading, updateObject })
    }).catch(err => {
        setLoading(false)
        console.log(err);
    });
}