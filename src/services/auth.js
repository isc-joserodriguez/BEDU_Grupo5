import axios from 'axios';

export const login = ({ data, setLoading, setToken, setErrorMessage }) => {
    axios.post(
        `${process.env.REACT_APP_API_Connect}/usuarios/login`, data).then(res => {
            localStorage.setItem('token', `Bearer ${res.data.detail.token}`);
            localStorage.setItem('type', res.data.detail.type);
            localStorage.setItem('id', res.data.detail._id);
            setErrorMessage('')
            setLoading(false);
            setToken(res.data.detail.token);
        }).catch(err => {
            setErrorMessage(err.response.data.message)
            setLoading(false);
        });
}

export const signup = ({ data, setLoading, setToken, setErrorMessage, history, register }) => {
    axios.post(`${process.env.REACT_APP_API_Connect}/usuarios/signup`, data, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    }).then(res => {
        setLoading(false);
        if (register) {
            history.push(`/${localStorage.getItem('type')}/users/${res.data.detail.id}`)
        } else {
            localStorage.setItem('token', `Bearer ${res.data.detail.token}`);
            localStorage.setItem('type', res.data.detail.type);
            localStorage.setItem('id', res.data.detail.id);
            setLoading(false);
            setToken(res.data.detail.token);
        }
    }).catch(err => {
        setErrorMessage(true)
        setLoading(false);
    });

}