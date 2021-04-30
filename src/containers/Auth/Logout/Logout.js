import React from 'react'
import PropTypes from 'prop-types';

import { Redirect } from 'react-router-dom'

const Logout = (props) => {
    localStorage.clear();
    props.setToken(null);
    return (
        <Redirect to='/' />
    )
}

Logout.propTypes = {
    setToken: PropTypes.func.isRequired
}

export default Logout