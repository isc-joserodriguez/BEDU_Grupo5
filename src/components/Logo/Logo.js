import React from 'react';
import PropTypes from 'prop-types';

import restaurantLogo from '../../assets/images/restaurant-logo.jpg';
import classes from './Logo.module.css';

const logo = (props) => (
    <div className={classes.Logo} style={{ height: props.height }}>
        <img src={restaurantLogo} alt="MyLogo" />
    </div>
);

logo.propTypes = {
    height: PropTypes.string.isRequired
}

export default logo;