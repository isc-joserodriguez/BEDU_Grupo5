import React from 'react'
import { Redirect } from 'react-router-dom'

const Logout = (props) => {
    localStorage.clear();
    props.setToken(null);
    return (
        <Redirect to="/" />
    )
}

export default Logout
