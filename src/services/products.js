import axios from 'axios';

export const getProductById = ({ id, setProduct }) => {
    axios.get(
        `${process.env.REACT_APP_API_Connect}/productos/${id}`, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    }).then(res => {
        setProduct(res.data.detail);
    }).catch(err => {
        console.log(err);
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

export const getCategoriesSelector = ({ newProductForm, setNewProductForm, setLoading, updateObject }) => {
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

        setNewProductForm(
            updateObject(newProductForm, {
                category: updateObject(newProductForm.category, {
                    value: categories[0],
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
