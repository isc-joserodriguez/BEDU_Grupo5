import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
    let links = [
        { route: '/', displayName: 'Iniciar sesión' },
        { route: '/signup', displayName: 'Registrarse' }
    ];

    if (props.isAuthenticated) {
        switch (localStorage.getItem('type')) {
            case 'admin':
                links = [
                    { route: '/admin', displayName: 'Inicio' },
                    { route: '/admin/new-user', displayName: 'Registrar Nuevo Usuario' },
                    { route: '/admin/pedidos', displayName: 'Ver Pedidos' },
                    { route: '/admin/menu', displayName: 'Menú' },
                    { route: '/logout', displayName: 'Cerrar Sesión' }
                ]
                break;
            case 'chef':
                links = [
                    { route: '/chef', displayName: 'Inicio' },
                    { route: '/logout', displayName: 'Cerrar Sesión' }
                ]
                break;
            case 'mesero':
                links = [
                    { route: '/mesero', displayName: 'Inicio' },
                    { route: '/logout', displayName: 'Cerrar Sesión' }
                ]
                break;
            default:
                links = [
                    { route: '/cliente', displayName: 'Inicio' },
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

export default navigationItems