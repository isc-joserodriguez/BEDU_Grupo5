import React from 'react'
import PropTypes from 'prop-types';

const Logout = (props) => {
    props.logout();
    return (
        <div>Cerrando Sesión</div>
    )
}

Logout.propTypes = {
    logout: PropTypes.func.isRequired
}

export default Logout