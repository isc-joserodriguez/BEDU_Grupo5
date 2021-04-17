import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
    const links = [
        { route: '/', displayName: 'Iniciar sesión' },
        { route: '/signup', displayName: 'Registrarse' },
        { route: '/admin', displayName: 'Admin' },
        { route: '/cliente', displayName: 'Cliente' },
        { route: '/chef', displayName: 'Chef' },
        { route: '/mesero', displayName: 'Mesero' },
    ].map((link, index) => <NavigationItem key={index} link={link.route} exact >{link.displayName}</NavigationItem>);
    return (
        <ul className={classes.NavigationItems}>
            {links}
        </ul>
    )
};

export default navigationItems