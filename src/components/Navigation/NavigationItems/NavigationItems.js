import React from 'react';
import PropTypes from 'prop-types';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = (props) => {
    const authenticatedLinks = {
        'admin': [
            { route: '/admin', displayName: 'Ver Pedidos' },
            { route: '/admin/products', displayName: 'Productos' },
            { route: '/admin/categories', displayName: 'Categorías' },
            { route: '/admin/users', displayName: 'Usuarios' },
            { route: '/admin/orders-history', displayName: 'Ver Historial' },
            { route: '/logout', displayName: 'Cerrar Sesión' }
        ],
        'chef': [
            { route: '/chef', displayName: 'Ordenes nuevas' },
            { route: '/chef/my-orders', displayName: 'Mis pedidos' },
            { route: '/logout', displayName: 'Cerrar Sesión' }
        ],
        'mesero': [
            { route: '/mesero', displayName: 'Ordenes nuevas' },
            { route: '/mesero/my-orders', displayName: 'Mis pedidos' },
            { route: '/logout', displayName: 'Cerrar Sesión' }
        ],
        'cliente': [
            { route: '/cliente', displayName: 'Menú' },
            { route: '/cliente/my-orders', displayName: 'Mis pedidos' },
            { route: '/logout', displayName: 'Cerrar Sesión' }
        ]

    }
    let links = [
        { route: '/', displayName: 'Iniciar sesión' },
        { route: '/signup', displayName: 'Registrarse' }
    ];

    if (props.isAuthenticated) {
        links = authenticatedLinks[localStorage.getItem('type')];
    }
    return (
        <ul className={classes.NavigationItems}>
            {links.map((link, index) => <NavigationItem key={index} link={link.route} exact >{link.displayName}</NavigationItem>)}
        </ul>
    )
};

NavigationItems.propTypes = {
    isAuthenticated: PropTypes.bool
}

export default NavigationItems