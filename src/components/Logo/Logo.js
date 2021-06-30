import React from 'react';

import restaurantLogo from '../../assets/images/LogoNav.svg';
import classes from './Logo.module.css';

const logo = () => (
    <div className={classes.Logo}>
        <img src={restaurantLogo} alt='MyLogo' />
    </div>
);

export default logo;