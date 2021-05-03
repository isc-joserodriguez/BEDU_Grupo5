import axios from 'axios';

export const getUsers = ({ setUsers, setLoading }) => {
    axios.get(
        `${process.env.REACT_APP_API_Connect}/usuarios`, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    }).then(res => {
        setUsers([...res.data.detail]);
        setLoading(false);
    }).catch(err => {
        setLoading(false)
        console.log(err);
    });
}

export const getUserById = ({ id, setUser, setLoading }) => {
    axios.get(
        `${process.env.REACT_APP_API_Connect}/usuarios/${id}`, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    }).then(res => {
        setUser(res.data.detail);
        setLoading(false);
    }).catch(err => {
        setLoading(false)
        console.log(err);
    });
}

export const getUserByIdForm = ({ id, editForm, setEditForm, updateObject, setLoading, owner }) => {
    axios.get(
        `${process.env.REACT_APP_API_Connect}/usuarios/${id}`, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    }).then(res => {
        let updatedControls = updateObject(editForm, {
            firstName: updateObject(editForm.firstName, {
                value: res.data.detail.firstName,
                valid: true,
                touched: true
            }),
            lastName: updateObject(editForm.lastName, {
                value: res.data.detail.lastName,
                valid: true,
                touched: true
            }),
            email: updateObject(editForm.email, {
                value: res.data.detail.email,
                valid: true,
                touched: true
            }),
            password: updateObject(editForm.password, {
                value: '',
                valid: false,
                touched: false
            }),
            confirmPassword: updateObject(editForm.confirmPassword, {
                value: '',
                valid: false,
                touched: false
            }),
            type: updateObject(editForm.type, {
                value: res.data.detail.type,
                valid: true,
                touched: true
            }),
        });
        if (owner) {
            delete updatedControls.type;
        } else {
            delete updatedControls.firstName;
            delete updatedControls.lastName;
            delete updatedControls.email;
        }
        setEditForm(updatedControls);
        setLoading(false);
    }).catch(err => {
        setLoading(false)
        console.log(err);
    });
}

export const editUser = ({ id, data, setLoading, setErrorMessage, history }) => {
    axios.put(
        `${process.env.REACT_APP_API_Connect}/usuarios/editar/${id}`, data, {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    }).then(res => {
        setLoading(false);
        history.push(`/${localStorage.getItem('type')}/users`)
    }).catch(err => {
        console.log(err);
        setLoading(false);
        setErrorMessage(true);
    });
}