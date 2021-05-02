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