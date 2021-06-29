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
        history.push(`/admin/products/${res.data.detail._id}`);
    }).catch(err => {
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
        if (setProducts) setProducts(res.data.detail);
        if (setLoading) setLoading(false);
    }).catch(err => {
        if (setLoading) setLoading(false);
    });
}

export const getProductsByCategory = ({ setProducts, setLoading, filter }) => {
    axios.post(
        `${process.env.REACT_APP_API_Connect}/productos/filtrar`, filter, {
        headers: {
            'Authorization': localStorage.getItem('token')
        },
    }).then(res => {
        setProducts(res.data.detail);
        setLoading(false);
    }).catch(err => {
        setLoading(false);
    });
}

export const filterProducts = ({ setProducts, setLoading, filter }) => {
    axios.post(
        `${process.env.REACT_APP_API_Connect}/productos/filtrar`, filter, {
        headers: {
            'Authorization': localStorage.getItem('token')
        },
    }).then(res => {
        setProducts(res.data.detail);
        setLoading(false);
    }).catch(err => {
        setLoading(false);
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
        history.push(`/${localStorage.getItem('type')}/products/${res.data.detail._id}`)
    }).catch(err => {
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
        let init = {
            displayValue: res.data.detail.idCategoria.name,
            value: res.data.detail.idCategoria._id
        }
        getCategoriesSelector({ editForm: updatedControls, setEditForm, setLoading, updateObject, init })
    }).catch(err => {
        setLoading(false);
    });
}

export const getCategoriesSelector = ({ editForm, setEditForm, setLoading, updateObject, init = false }) => {
    axios.get(
        `${process.env.REACT_APP_API_Connect}/categoria`, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    }).then(res => {

        let categories = {};
        res.data.detail.forEach((category) => {
            categories[category.name] = category._id
        })

        let ordenedCategories = Object.keys(categories).sort()


        categories = ordenedCategories.map(category => ({
            value: categories[category],
            displayValue: category,
        }))

        if (init) {
            categories.unshift(init)
        }

        setEditForm(
            updateObject(editForm, {
                category: updateObject(editForm.category, {
                    elementConfig: {
                        options: categories
                    },
                    value: categories[0].value
                })
            })
        );
        setLoading(false);
    }).catch(err => {
        setLoading(false);
    });
}

export const toggleStatusProduct = ({ id, status }) => {
    axios.put(
        `${process.env.REACT_APP_API_Connect}/productos/cambiarEstatus/${id}`, { status }, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    }).then().catch();
}