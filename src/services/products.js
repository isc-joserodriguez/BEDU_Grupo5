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