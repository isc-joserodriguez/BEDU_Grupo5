import axios from 'axios';

export const login = ({ data, setLoading, setToken, setErrorMessage }) => {
    axios.post(
        'https://bedu-api-restaurante.herokuapp.com/v1/usuarios/login', data).then(res => {
            localStorage.setItem('token', `Bearer ${res.data.detail.token}`);
            localStorage.setItem('type', res.data.detail.type);
            setLoading(false);
            setToken(res.data.detail.token);
        }).catch(err => {
            console.log(err);
            setErrorMessage(true)
            setLoading(false);
        });
}

export const signup = ({ data, setLoading, setToken, setErrorMessage, history, register }) => {
    axios.post('https://bedu-api-restaurante.herokuapp.com/v1/usuarios/signup', data, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    }).then(res => {
        setLoading(false);
        alert('Se creó el usuario');
        if (register) {
            history.push(`/admin`);
        } else {
            localStorage.setItem('token', `Bearer ${res.data.detail.token}`);
            localStorage.setItem('type', res.data.detail.type);
            setLoading(false);
            setToken(res.data.detail.token);
        }
    }).catch(err => {
        setErrorMessage(true)
        setLoading(false);
    });

}