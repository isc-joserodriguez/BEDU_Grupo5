import axios from 'axios';

export const login = ({ data, setLoading, setToken, setErrorMessage }) => {
    axios.post(
        `${process.env.REACT_APP_API_Connect}/usuarios/login`, data).then(res => {
            if(!res.data.detail.status){
                alert('Usuario desactivado');
                return;
            }
            localStorage.setItem('token', `Bearer ${res.data.detail.token}`);
            localStorage.setItem('type', res.data.detail.type);
            localStorage.setItem('id', res.data.detail._id);
            setLoading(false);
            setToken(res.data.detail.token);
        }).catch(err => {
            console.log(err);
            setErrorMessage(true)
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
        alert('Se creó el usuario');
        if (register) {
            history.push(`/admin`);
        } else {
            localStorage.setItem('token', `Bearer ${res.data.detail.token}`);
            localStorage.setItem('type', res.data.detail.type);
            localStorage.setItem('id', res.data.detail._id);
            setLoading(false);
            setToken(res.data.detail.token);
        }
    }).catch(err => {
        setErrorMessage(true)
        setLoading(false);
    });

}