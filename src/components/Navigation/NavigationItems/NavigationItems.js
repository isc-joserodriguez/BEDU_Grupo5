import React from 'react';
import PropTypes from 'prop-types';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = (props) => {
    let links = [
        { route: '/', displayName: 'Iniciar sesión' },
        { route: '/signup', displayName: 'Registrarse' }
    ];

    if (props.isAuthenticated) {
        switch (localStorage.getItem('type')) {
            case 'admin':
                links = [
                    { route: '/admin', displayName: 'Ver Pedidos' },
                    { route: '/admin/orders-history', displayName: 'Ver Historial' },
                    { route: '/admin/users', displayName: 'Usuarios' },
                    { route: '/admin/new-user', displayName: 'Registrar Nuevo Usuario' },
                    { route: '/admin/menu', displayName: 'Menú' },
                    { route: '/logout', displayName: 'Cerrar Sesión' }
                ]
                break;
            case 'chef':
                links = [
                    { route: '/chef', displayName: 'Ordenes nuevas' },
                    { route: '/chef/my-orders', displayName: 'Mis pedidos' },
                    { route: '/logout', displayName: 'Cerrar Sesión' }
                ]
                break;
            case 'mesero':
                links = [
                    { route: '/mesero', displayName: 'Ordenes nuevas' },
                    { route: '/mesero/my-orders', displayName: 'Mis pedidos' },
                    { route: '/logout', displayName: 'Cerrar Sesión' }
                ]
                break;
            default:
                links = [
                    { route: '/cliente', displayName: 'Menú' },
                    { route: '/cliente/my-orders', displayName: 'Mis pedidos' },
                    { route: '/logout', displayName: 'Cerrar Sesión' }
                ]
                break;
        }
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